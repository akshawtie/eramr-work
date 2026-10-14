// WhatsApp Cloud API — Netlify Serverless Function
// Receives contact form data and sends a WhatsApp message to the business owner.
//
// Required environment variables (set in Netlify Dashboard → Site → Environment Variables):
//   WHATSAPP_PHONE_NUMBER_ID  — Your WhatsApp Business phone number ID (from Meta Developer Dashboard)
//   WHATSAPP_ACCESS_TOKEN     — Permanent access token (from Meta Developer Dashboard)
//   WHATSAPP_RECIPIENT        — Your personal WhatsApp number WITH country code, no +, no spaces (e.g. 919876543210)

export default async (req, context) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, phone, inquiryType, message, timestamp } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !inquiryType || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const PHONE_NUMBER_ID = Netlify.env.get("WHATSAPP_PHONE_NUMBER_ID");
    const ACCESS_TOKEN = Netlify.env.get("WHATSAPP_ACCESS_TOKEN");
    const RECIPIENT = Netlify.env.get("WHATSAPP_RECIPIENT");

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN || !RECIPIENT) {
      console.error("Missing WhatsApp environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Format the message
    const formattedDate = new Date(timestamp || Date.now()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const whatsappMessage =
      `🔔 *New Website Inquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📋 *Type:* ${inquiryType}\n\n` +
      `💬 *Message:*\n${message}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🕐 ${formattedDate}`;

    // Send via WhatsApp Cloud API
    const waResponse = await fetch(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: RECIPIENT,
          type: "text",
          text: {
            preview_url: false,
            body: whatsappMessage,
          },
        }),
      }
    );

    const waResult = await waResponse.json();

    if (!waResponse.ok) {
      console.error("WhatsApp API error:", JSON.stringify(waResult));
      return new Response(
        JSON.stringify({ error: "Failed to send WhatsApp message", details: waResult }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: waResult.messages?.[0]?.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
