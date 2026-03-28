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

    const logoUrl = "https://xilestudios.ca/images/logo.jpg";

    await resend.emails.send({
      from: "Xile Studios <hello@xilestudios.ca>",
      to: "aidress.qadeer123@gmail.com",
      replyTo: email,
      subject: `New Inquiry - ${service || "Xile Studios"}`,
      html: `
        <div style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
              
              <div style="padding:28px 28px 20px 28px;background:linear-gradient(135deg,#7c3aed,#22d3ee);">
                <img src="${logoUrl}" alt="Xile Studios" style="width:52px;height:auto;display:block;margin-bottom:14px;" />
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;">New Inquiry</h1>
                <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.9);">
                  A new lead just came in through the Xile Studios website.
                </p>
              </div>

              <div style="padding:28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;"><strong>Name</strong></td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;"><strong>Email</strong></td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;"><strong>Phone</strong></td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;"><strong>Business</strong></td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;"><strong>Service</strong></td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">${service}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;"><strong>Budget</strong></td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">${budget}</td>
                  </tr>
                </table>

                <div style="margin-top:24px;">
                  <div style="font-size:14px;font-weight:bold;color:#111827;margin-bottom:8px;">Project Details</div>
                  <div style="padding:16px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:14px;line-height:1.7;color:#374151;">
                    ${message.replace(/\n/g, "<br/>")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "Xile Studios <hello@xilestudios.ca>",
      to: email,
      subject: "We received your inquiry",
      html: `
        <div style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
              
              <div style="padding:28px 28px 20px 28px;background:linear-gradient(135deg,#7c3aed,#22d3ee);text-align:center;">
                <img src="${logoUrl}" alt="Xile Studios" style="width:58px;height:auto;display:block;margin:0 auto 14px auto;" />
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;">Thanks for reaching out</h1>
                <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.92);">
                  We received your inquiry and will get back to you within 12–24 hours.
                </p>
              </div>

              <div style="padding:28px;">
                <p style="margin:0 0 16px 0;font-size:15px;line-height:1.8;color:#374151;">
                  Hey ${name},
                </p>

                <p style="margin:0 0 20px 0;font-size:15px;line-height:1.8;color:#374151;">
                  Your request has been received successfully. We’ll review your inquiry and follow up soon.
                </p>

                <div style="padding:16px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;">
                  <p style="margin:0 0 8px 0;font-size:14px;color:#111827;"><strong>Selected Service:</strong> ${service || "Not specified"}</p>
                  <p style="margin:0;font-size:14px;color:#111827;"><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
                </div>

                <p style="margin:22px 0 0 0;font-size:14px;line-height:1.8;color:#6b7280;">
                  If you need to add anything else, just reply to this email.
                </p>
              </div>

              <div style="padding:18px 28px;background:#fafafa;border-top:1px solid #e5e7eb;text-align:center;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">© Xile Studios</p>
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