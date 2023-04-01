class Painting < ApplicationRecord
    validates :name, presence: true
    validates :img_url, presence: true
    validates :museum_id, presence: true

    belongs_to :user
    belongs_to :museum
end
