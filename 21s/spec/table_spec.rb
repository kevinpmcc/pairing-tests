require_relative '../lib/table.rb'

describe 'Table' do
  it 'takes a deck, a player and a dealer and has cards' do
    player = Player.new('Sam')
    dealer = Player.new('Dealer')
    deck = Deck.new
    table = Table.new(deck, player, dealer)

    expect(table.cards).to eq deck.cards
  end
end
