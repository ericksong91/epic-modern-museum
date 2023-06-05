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
            render_not_authorized_response
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            session.delete :user_id
            user.destroy
            head :no_content
        else
            render_not_authorized_response
        end
    end

    private

    def render_not_authorized_response
        render json:  { "errors": "Not authorized" }, status: :unauthorized
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio)
    end
end
