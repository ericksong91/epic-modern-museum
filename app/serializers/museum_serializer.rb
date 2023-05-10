class MuseumSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :location

  has_many :paintings
end
