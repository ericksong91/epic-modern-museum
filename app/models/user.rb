class User < ApplicationRecord
    validates :username, presence: true
    validates :username, uniqueness: true

    has_secure_password
    has_many :paintings
    has_many :museums, through: :paintings
end
