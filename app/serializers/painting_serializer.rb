class PaintingSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :img_url, :user_id, :museum_id, :year
end
