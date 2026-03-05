function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  
  // 1. Append data to Google Sheet
  sheet.appendRow([
    data.name, 
    data.email, 
    "'" + data.mobile, // Added apostrophe to keep phone number as text
    data.payment, 
    new Date()
  ]);
  
  // 2. Send the "Sweet" Confirmation Email
  sendConfirmationEmail(data);
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

function sendConfirmationEmail(data) {
  var subject = "🌙 Your Iftar-E-Yanaara Registration is Received!";
  
  var htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
      <h2 style="color: #064e3b; text-align: center;">Assalamu Alaikum, ${data.name}!</h2>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        Thank you so much for joining us for <strong>Iftar-E-Yanaara 2026</strong>. We are absolutely delighted to have you as part of this blessed gathering.
      </p>
      <div style="background-color: #fccf3e22; padding: 15px; border-radius: 10px; border-left: 5px solid #fccf3e; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold; color: #011612;">Registration Status: Pending Verification</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Our team is currently verifying your bKash payment (Ref: ${data.payment}).</p>
      </div>
      <p style="font-size: 16px; color: #333;">
        Please stay tuned! Once the payment is confirmed, you will receive a <strong>final confirmation email</strong> with your entry details shortly.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="text-align: center; font-style: italic; color: #777;">
        May this Ramadan bring peace and joy to your heart. We can't wait to see you there!
      </p>
      <p style="text-align: center; font-weight: bold; color: #064e3b;">
        — The Iftar-E-Yanaara Team
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody
  });
}