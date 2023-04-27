pp "Destroying old data..."

#Destroying Data
Painting.destroy_all
User.destroy_all
Museum.destroy_all

#Requirements
require 'faker'

pp "Now Seeding Users..."

5.times do
    user = User.create!(username: "#{Faker::Name.first_name}##{rand(1000...9999)}", password:"asdf", 
        password_confirmation: "asdf", bio: "#{Faker::Lorem.paragraphs(number:1)[0]}")
end

user = User.create!(username: "Eric", password:"asdf", password_confirmation: "asdf", bio: "Random artist! wahoo!")

pp "Now Seeding Museums..."

3.times do
    museum = Museum.create!(name: "Museum of #{Faker::Name.first_name}", location: "#{Faker::Address.city}", bio: "#{Faker::Lorem.paragraphs(number:1)[0]}")
end

pp "Now Seeding Paintings..."

10.times do
    painting = Painting.create!(name: "Painting of #{Faker::Name.first_name}", bio: "Super cool picture!", img_url: "#{Faker::LoremFlickr.image}", year: rand(2006..2023),
    user_id: rand(User.first.id..User.last.id), museum_id: rand(Museum.first.id..Museum.last.id))
end

pp "Done Seeding!"
