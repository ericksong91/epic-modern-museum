class PaintingSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :img_url

  belongs_to :user
  belongs_to :museum
end
