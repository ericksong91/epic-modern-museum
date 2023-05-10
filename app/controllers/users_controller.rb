class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created, serializer: UserProfileSerializer
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :created, serializer: UserProfileSerializer
        else
            render json: { errors: "No user found" }, status: :unauthorized
        end
    end

    private 

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio)
    end
end
