/**
 * Google Apps Script — Email sender for Energiärenden
 * Deployed as web app, receives POST requests and sends email via Gmail.
 * Completely free, emails come from the user's own Gmail address.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var to = data.to;
    var subject = data.subject;
    var body = data.body;
    var replyTo = data.replyTo || '';

    if (!to || !subject || !body) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false, error: 'Missing to, subject, or body'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var options = {};
    if (replyTo) options.replyTo = replyTo;

    GmailApp.sendEmail(to, subject, body, options);

    return ContentService.createTextOutput(JSON.stringify({
      ok: true, sent: true, to: to, subject: subject
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, error: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true, service: 'Energiarenden Email Sender', status: 'ready'
  })).setMimeType(ContentService.MimeType.JSON);
}
