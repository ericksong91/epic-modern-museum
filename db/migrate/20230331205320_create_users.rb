class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username, :password_digest
      t.string :bio

      t.timestamps
    end
  end
end
