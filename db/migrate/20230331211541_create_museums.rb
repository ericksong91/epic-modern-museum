class CreateMuseums < ActiveRecord::Migration[6.1]
  def change
    create_table :museums do |t|
      t.string :name, :location, :bio

      t.timestamps
    end
  end
end
