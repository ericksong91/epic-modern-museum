class User < ApplicationRecord
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, uniqueness: { case_sensitive: false }
    validates :password_digest, presence: true

    has_secure_password
    
    has_many :paintings, dependent: :destroy
    has_many :museums, through: :paintings
end
