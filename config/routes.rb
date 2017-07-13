Rails.application.routes.draw do
  root to: 'pages#home' # root is like homepage, so we're saying the homepage needs to point to the pages controller, home method
end

# routes file is the first file opened when someone comes to the site, rails says "okay, the root (the homepage) points to the pages controller, and the home action in there"
# then ruby says "okay, there's a home action in there, I need to grab a corresponding view file, it gathers that code, and sends to users browser"
