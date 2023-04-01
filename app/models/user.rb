class User < ApplicationRecord
    has_secure_password
    has_many :paintings
    has_many :museums, through: :paintings
end
