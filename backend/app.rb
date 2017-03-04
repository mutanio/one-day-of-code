require 'grape'

class GroupChatAPI < Grape::API
  format :json

  before do
    header 'Access-Control-Allow-Origin', '*'
  end

  get '/messages' do
    [
      {
        author: 'Forrest',
        content: 'LOL',
        created_at: Time.now
      }
    ]
  end

  params do
    requires :author, type: String,  desc: 'author of the message'
    requires :content, type: String, desc: 'content of the message'
  end
  post '/messages' do
    {
      author: params[:author],
      content: params[:content],
      created_at: Time.now
    }
  end
end
