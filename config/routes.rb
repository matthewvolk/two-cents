# Routes.rb is the first file opened when someone comes to the site, rails says "okay, the root (the homepage) points to the pages controller, and the home action in there"
# then ruby says "okay, there's a home action in there, I need to grab a corresponding view file, it gathers that code, and sends to users browser"

Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users, controllers: { registrations: "users/registrations" }
  get 'about', to: 'pages#about'
  resources :contacts, only: :create
  get 'contact', to: 'contacts#new', as: 'new_contact'
end
