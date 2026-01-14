import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = {
      to: 'hello@collation.ai',
      from: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Check if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Use Resend to send email
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'sinan.biren@collation.ai',
          subject: emailContent.subject,
          html: emailContent.html,
          reply_to: email,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend error:', error);
        throw new Error('Failed to send email');
      }

      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.'
      });
    } else {
      // Fallback: Log to console and return success
      // In production, you should set up email sending
      console.log('Contact form submission (Email service not configured):');
      console.log(emailContent);

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! We have received your inquiry.',
        warning: 'Email service not configured - message logged to console'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly at hello@collation.ai' },
      { status: 500 }
    );
  }
}
