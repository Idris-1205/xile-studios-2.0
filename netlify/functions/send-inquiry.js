import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const data = JSON.parse(event.body);

    const {
      name = "",
      email = "",
      phone = "",
      company = "",
      service = "",
      budget = "",
      message = "",
    } = data;

    const logoUrl = "https://xilestudios.ca/assets/images/logo/logo.png";

    // EMAIL TO YOU
    await resend.emails.send({
      from: "Xile Studios <hello@xilestudios.ca>",
      to: "aidress.qadeer123@gmail.com",
      replyTo: email,
      subject: `New Inquiry - ${service || "Xile Studios"}`,
      html: `
      <div style="margin:0;padding:0;background:#0b0b0f;font-family:Inter,Arial,sans-serif;color:#e5e7eb;">
        <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
          
          <div style="background:#111118;border-radius:18px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

            <div style="padding:24px;background:linear-gradient(135deg,#6d28d9,#9333ea);">
              <img src="${logoUrl}" style="height:42px;margin-bottom:12px;" />
              <h1 style="margin:0;color:#ffffff;font-size:24px;">New Inquiry</h1>
              <p style="margin:6px 0 0 0;color:rgba(255,255,255,0.8);font-size:13px;">
                A new lead came in from xilestudios.ca
              </p>
            </div>

            <div style="padding:24px;">

              <table width="100%" style="border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:10px 0;color:#9ca3af;">Name</td><td style="padding:10px 0;color:#fff;">${name}</td></tr>
                <tr><td style="padding:10px 0;color:#9ca3af;">Email</td><td style="padding:10px 0;color:#fff;">${email}</td></tr>
                <tr><td style="padding:10px 0;color:#9ca3af;">Phone</td><td style="padding:10px 0;color:#fff;">${phone}</td></tr>
                <tr><td style="padding:10px 0;color:#9ca3af;">Business</td><td style="padding:10px 0;color:#fff;">${company}</td></tr>
                <tr><td style="padding:10px 0;color:#9ca3af;">Service</td><td style="padding:10px 0;color:#fff;">${service}</td></tr>
                <tr><td style="padding:10px 0;color:#9ca3af;">Budget</td><td style="padding:10px 0;color:#fff;">${budget}</td></tr>
              </table>

              <div style="margin-top:20px;">
                <div style="font-size:13px;color:#9ca3af;margin-bottom:6px;">Project Details</div>
                <div style="background:#0f0f14;border:1px solid rgba(255,255,255,0.06);padding:16px;border-radius:12px;font-size:14px;line-height:1.6;color:#d1d5db;">
                  ${message.replace(/\n/g, "<br/>")}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      `,
    });

    // EMAIL TO CLIENT
    await resend.emails.send({
      from: "Xile Studios <hello@xilestudios.ca>",
      to: email,
      subject: "We received your inquiry",
      replyTo: "aidress.qadeer123@gmail.com",
      html: `
      <div style="margin:0;padding:0;background:#0b0b0f;font-family:Inter,Arial,sans-serif;color:#e5e7eb;">
        <div style="max-width:640px;margin:0 auto;padding:32px 20px;">

          <div style="background:#111118;border-radius:18px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

            <div style="padding:28px;background:linear-gradient(135deg,#6d28d9,#9333ea);text-align:center;">
              <img src="${logoUrl}" style="height:46px;margin-bottom:14px;" />
              <h1 style="margin:0;font-size:24px;color:#ffffff;">We got your request</h1>
              <p style="margin-top:8px;font-size:13px;color:rgba(255,255,255,0.85);">
                Xile Studios will review your inquiry and respond shortly.
              </p>
            </div>

            <div style="padding:26px;">

              <p style="margin:0 0 16px 0;font-size:15px;color:#d1d5db;">
                Hey ${name},
              </p>

              <p style="margin:0 0 20px 0;font-size:15px;color:#9ca3af;line-height:1.7;">
                Your inquiry has been received. We’ll review your request and get back to you within 12–24 hours.
              </p>

              <div style="background:#0f0f14;border:1px solid rgba(255,255,255,0.06);padding:16px;border-radius:12px;">
                <p style="margin:0 0 8px 0;font-size:14px;color:#fff;">
                  <strong>Service:</strong> ${service || "Not specified"}
                </p>
                <p style="margin:0;font-size:14px;color:#fff;">
                  <strong>Budget:</strong> ${budget || "Not specified"}
                </p>
              </div>

              <p style="margin:22px 0 0 0;font-size:14px;color:#9ca3af;">
                You can reply to this email if you want to add anything else.
              </p>

            </div>

            <div style="padding:16px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:12px;color:#6b7280;">
                © Xile Studios • xilestudios.ca
              </p>
            </div>

          </div>
        </div>
      </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emails sent successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}