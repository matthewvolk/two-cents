class ContactMailer < ActionMailer::Base
    default to: 'volkmattj@gmail.com'
    
    def contact_email(name, email, body)
       @name = name
       @email = email
       @body = body
       
       mail(from: email, subject: 'Message from TwoCents')
    end
end