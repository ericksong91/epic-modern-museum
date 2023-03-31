class CreatePaintings < ActiveRecord::Migration[6.1]
  def change
    create_table :paintings do |t|
      t.string :name, :bio, :img_url
      t.integer :year, :user_id, :museum_id

      t.timestamps
    end
  end
end
