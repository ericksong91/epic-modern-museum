class PaintingSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :img_url, :user_id, :museum_id

  belongs_to :user
  belongs_to :museum
end
