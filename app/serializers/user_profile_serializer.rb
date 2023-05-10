class UserProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio

  has_many :museums
  has_many :paintings
end
