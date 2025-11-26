from .. import mailsender
from flask import current_app, render_template
from flask_mail import Message
from smtplib import SMTPException

def sendMail(to, subject, template, **kwargs):
    """
    Envia un correo electrónico utilizando Flask-Mail.
    
    to: Dirección de correo electrónico del destinatario (o lista de destinatarios).
    subject: Asunto del correo electrónico.
    template: Nombre de la plantilla HTML para el contenido del correo.
    kwargs: Variables adicionales a pasar a la plantilla.
    """
    if not isinstance(to, list):
        to = [to]  # Convertir a lista si es una cadena

    msg = Message(subject, sender=current_app.config['MAIL_DEFAULT_SENDER'], recipients=to)
    try:
        msg.body = render_template(template + '.txt', usuario=kwargs.get('nuevo_usuario'))
        msg.html = render_template(template + '.html', usuario=kwargs.get('nuevo_usuario'))
        mailsender.send(msg)
        print(f"Correo enviado a {to} con asunto '{subject}'")
    except SMTPException as e:
        print(f"Error al enviar el correo a {to}: {str(e)}")
        raise e