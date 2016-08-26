require './lib/robot'
require 'spec_helper'

describe Robot do
  let(:robot) { described_class.new }

  describe '#request_input' do
    it 'requests input from user' do
      output = capture_stdout { robot }
      expect(output).to eq "Please enter directions\n"
    end
  end

  describe('#location') do
    it 'returns its current location' do
      expect(robot).to respond_to(:current_location)
    end

    context('at the beginning of the game') do
      it 'returns the starting location of 0,0' do
        expect(robot.current_location).to eq [0, 0]
      end
    end
  end

  describe('#directions') do
    it 'changes the current_location to [1,1] when passed N E' do
      robot.directions('N E')
      expect(robot.current_location).to eq [1,1]
    end 

    it ' changes the current_location to [-1.-1] when passed S W' do
      robot.directions('S W')
      expect(robot.current_location).to eq [-1,-1]
    end

    it 'changes the current location to [4,-4] "N E N E N E N E"' do
      robot.directions('N E N E N E N E')
      expect(robot.current_location).to eq [4,4]
    end

    it 'will not allow you to move off the map' do
      expect { robot.directions('N N N N N N N N N N N N') }.to raise_error 'SORRY OUTSIDE LIMITS'
    end
  end
def capture_stdout(&block)
  original_stdout = $stdout
  $stdout = fake = StringIO.new
  begin
    yield
  ensure
    $stdout = original_stdout
  end
  fake.string
end
end
