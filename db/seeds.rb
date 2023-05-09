pp "Destroying old data..."

#Destroying Data
Painting.destroy_all
User.destroy_all
Museum.destroy_all

#Requirements
require 'faker'

images = [
    'https://openclipart.org/image/800px/9111',
    'https://openclipart.org/image/800px/314327',
    'https://openclipart.org/image/800px/2569',
    'https://openclipart.org/image/800px/281534',
    'https://openclipart.org/image/800px/183884',
    'https://openclipart.org/image/800px/9079',
    'https://openclipart.org/image/800px/217049'
]

pp "Now Seeding Users..."

5.times do
    user = User.create!(username: "#{Faker::Name.first_name}##{rand(1000...9999)}", password:"asdf", 
        password_confirmation: "asdf", bio: "#{Faker::Lorem.paragraphs(number:1)[0]}")
end

user = User.create!(username: "Eric", password:"asdf", password_confirmation: "asdf", bio: "Random artist! wahoo!")

pp "Now Seeding Museums..."

5.times do
    museum = Museum.create!(name: "Museum #{Faker::Name.first_name}", location: "#{Faker::Address.city}", bio: "#{Faker::Lorem.paragraphs(number:1)[0]}")
end

pp "Now Seeding Paintings..."

20.times do
    painting = Painting.create!(name: "#{Faker::Name.first_name}", bio: "#{Faker::Lorem.paragraphs(number:2)[0]}, 
    #{Faker::Lorem.paragraphs(number:2)[1]}", img_url: images[rand(0..6)], year: rand(2006..2023),
    user_id: rand(User.first.id..User.last.id), museum_id: rand(Museum.first.id..Museum.last.id))
end

pp "Done Seeding!"
