class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :museums
  has_many :paintings
end
