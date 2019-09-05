require_relative '../lib/player.rb'

describe 'Player' do
  it 'creates a player with no cards' do
    player = Player.new('Sam')

    expect(player.cards).to eq []
  end

  it 'creates a player with a given name' do
    player = Player.new('Sam')

    expect(player.name).to eq 'Sam'
  end
end
