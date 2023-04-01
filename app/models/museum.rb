class Museum < ApplicationRecord
    validates :name, presence: true
    validates :location, presence: true
    validates :bio, presence: true

    has_many :paintings
    has_many :users, through: :paintings
end
