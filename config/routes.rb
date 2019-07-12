Rails.application.routes.draw do
  resources :events
  resources :menus
 
  devise_for :users, controllers: {
        registrations: 'users/registrations'
  }

  get 'convenios', to: 'convenios#index'
  get 'tratamientos', to: 'tratamientos#index'
  get 'contactos', to: 'contactos#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "menus#index"
end
