const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const stripe = require("../services/stripe");

const Professional = require("../models/professional");
const SalonProfessional = require("../models/relationship/salonProfessional");

router.post("/", async (req, res) => {
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const { professional, salonId } = req.body;

    let newProfessional = null;
    let onboardingUrl = null;

    const existingProfessional = await Professional.findOne({
      $or: [
        { email: professional.email },
        { phone: professional.phone },
      ],
    });

    // If not exist
    if (!existingProfessional) {
      // Create Stripe connected account
      const stripeAccount = await stripe.v2.core.accounts.create({
        contact_email: professional.email,
        display_name: professional.name,

        dashboard: "express",

        identity: {
          country: "br",
          entity_type: "individual",
        },

        configuration: {
          merchant: {
            capabilities: {
              card_payments: {
                requested: true,
              },
            },
          },

          recipient: {
            capabilities: {
              stripe_balance: {
                stripe_transfers: {
                  requested: true,
                },
              },
            },
          },
        },

        defaults: {
          currency: "brl",

          responsibilities: {
            fees_collector: "application",
            losses_collector: "application",
          },
        },

        include: [
          "configuration.merchant",
          "configuration.recipient",
          "identity",
          "requirements",
        ],
      });

      // Create Professional
      newProfessional = await new Professional({
        ...professional,
        stripeAccountId: stripeAccount.id,
      }).save({ session });

      // Create Stripe onboarding link
      const accountLink = await stripe.v2.core.accountLinks.create({
        account: stripeAccount.id,

        use_case: {
          type: "account_onboarding",

          account_onboarding: {
            configurations: ["recipient", "merchant"],
            refresh_url: "https://example.com/stripe/refresh",
            return_url: "https://example.com/stripe/return",
          },
        },
      });

      onboardingUrl = accountLink.url;
    }

    // Relationship
    const professionalId = existingProfessional
      ? existingProfessional._id
      : newProfessional._id;

    // Verify if the relationship with the salon exists
    const existingRelationship = await SalonProfessional.findOne({
      salonId,
      professionalId,
      status: { $ne: "D" },
    });

    // If not linked
    if (!existingRelationship) {
      await new SalonProfessional({
        salonId,
        professionalId,
        status: professional.link,
      }).save({ session });
    }

    // If the relationship exists and is inactive
    if (existingRelationship && existingRelationship.status === "I") {
      await SalonProfessional.findOneAndUpdate(
        {
          salonId,
          professionalId,
        },
        {
          status: professional.link,
        },
        {
          session,
        }
      );
    }

    await session.commitTransaction();
    session.endSession();

    // Professional and relationship already exist
    if (existingProfessional && existingRelationship) {
      return res.json({
        error: true,
        message: "Professional already registered!",
      });
    }

    return res.json({
      error: false,
      professional: newProfessional,
      onboardingUrl,
    });

  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    session.endSession();

    return res.json({
      error: true,
      message: err.message,
    });
  }
});

// Getting onboarding link
router.get("/onboarding/:id", async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);

    if (!professional) {
      return res.json({
        error: true,
        message: "Professional not found",
      });
    }

    const accountLink = await stripe.v2.core.accountLinks.create({
      account: professional.stripeAccountId,

      use_case: {
        type: "account_onboarding",

        account_onboarding: {
          configurations: ["recipient", "merchant"],
          refresh_url: "https://example.com/stripe/refresh",
          return_url: "https://example.com/stripe/return",
        },
      },
    });

    return res.json({
      error: false,
      onboardingUrl: accountLink.url,
    });

  } catch (err) {
    return res.json({
      error: true,
      message: err.message,
    });
  }
});

module.exports = router;