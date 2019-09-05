require_relative '../lib/deck.rb'

describe 'Deck' do
  it 'creates 52 cards' do
    deck = Deck.new

    expect(deck.cards.length).to eq 52
  end

  it 'should have 13 with suit spade' do
    deck = Deck.new

    expect(deck.cards.select {|card| card.suit == 'spade'}.length).to eq 13
  end

  it 'should have 4 queens' do
    deck = Deck.new

    expect(deck.cards.select {|card| card.rank == 'Q'}.length).to eq 4
  end
end

