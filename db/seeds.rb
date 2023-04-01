# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Make Users

pp "Now Seeding...."

5.times do
    user = User.create(username: "#{Faker::Name.first_name}##{rand(1000...9999)}", password:"asdf", 
        password_confirmation: "asdf", bio: "#{Faker::Lorem.paragraphs(number:1)}")
end

3.times do
    museum = Museum.create(name: "Museum of #{Faker::Name.first_name}", location: "#{Faker::Address.city}", bio: "#{Faker::Lorem.paragraphs(number:1)}")
end

10.times do
    painting = Painting.create(name: "Painting of #{Faker::Name.first_name}", bio: "Super cool picture!", img_url: "#{Faker::LoremFlickr.image}", year: rand(2006..2023),
    user_id: rand(1..User.count), museum_id: rand(1..Museum.count))
end

pp "Done Seeding!"

