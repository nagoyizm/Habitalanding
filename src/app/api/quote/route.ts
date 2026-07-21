import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar cliente de Resend (la API key debe estar en .env o .env.local como RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, facility, message } = body;

    if (!name || !email || !facility || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Enviar el correo electrónico
    const { data, error } = await resend.emails.send({
      from: 'Agendio <contacto@agendio.cl>',
      to: 'contacto@agendio.cl',
      replyTo: email,
      subject: `Nueva Cotización: ${facility}`,
      html: `
        <h2>Nueva solicitud de cotización recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Recinto:</strong> ${facility}</p>
        <br/>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br/>')}</p>
  `,
});

    if (error) {
      console.error('Error desde Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Error general enviando cotización:', err);
    return NextResponse.json({ error: 'Error interno del servidor al enviar el correo' }, { status: 500 });
  }
}
