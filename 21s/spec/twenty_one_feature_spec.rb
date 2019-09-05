## Deck
# - cards (should have right number of suits ranks)
# - give_card
# 
# Card
# - rank
# - suit
#
#
## Player
# - cards
# - first_turn
# - second_turn
# - risk_tolerance (take_card?)
# - take_a_card
## GameRules
# - value of each card
# - how many cards to give out each round
#
# Table 
# - cards
# - players
#
describe 'twenty_one' do 
  xit 'with an unshuffled deck can give each player two cards and check if either player has blackjack' do
    player = Player.new('Sam')
    dealer = Player.new('Dealer')
    deck = Deck.new
    table = Table.new(deck, player, dealer)

    table.start_game
    expect(table.player.hand_score).to eq 5
    expect(table..dealer_hand_score).to eq 9
    expect(table.any_black_jacks?).to eq false
  end
end
