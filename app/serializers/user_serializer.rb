class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :paintings
  has_many :museums, through: :paintings
end
