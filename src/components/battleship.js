import React from 'react';
import $ from 'jquery';

class Battleship extends React.Component {
  setDefaultValues = () => {
    this.ship = 'carrier';
    this.oob = false;
    this.horizontal = 1;
    this.vertical = 0;
    this.enemySelection = [];
    this.mySelection = [
      {
        ship: 'carrier',
        location: [],
        spacesFound: 0,
      },
      {
        ship: 'battleship',
        location: [],
        spacesFound: 0,
      },
      {
        ship: 'cruiser',
        location: [],
        spacesFound: 0,
      },
      {
        ship: 'submarine',
        location: [],
        spacesFound: 0,
      },
      {
        ship: 'destroyer',
        location: [],
        spacesFound: 0,
      },
    ];
    this.spaces = [
      ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'ob', 'ob', 'ob', 'ob'],
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'ob', 'ob', 'ob', 'ob'],
      ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'ob', 'ob', 'ob', 'ob'],
      ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'ob', 'ob', 'ob', 'ob'],
      ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'ob', 'ob', 'ob', 'ob'],
      ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'ob', 'ob', 'ob', 'ob'],
      ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'ob', 'ob', 'ob', 'ob'],
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
    ];
    this.spacesReference = [
      ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'ob', 'ob', 'ob', 'ob'],
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'ob', 'ob', 'ob', 'ob'],
      ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'ob', 'ob', 'ob', 'ob'],
      ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'ob', 'ob', 'ob', 'ob'],
      ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'ob', 'ob', 'ob', 'ob'],
      ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'ob', 'ob', 'ob', 'ob'],
      ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'ob', 'ob', 'ob', 'ob'],
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
    ];
    this.enemySpaces = [
      ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'ob', 'ob', 'ob', 'ob'],
      ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'ob', 'ob', 'ob', 'ob'],
      ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'ob', 'ob', 'ob', 'ob'],
      ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'ob', 'ob', 'ob', 'ob'],
      ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'ob', 'ob', 'ob', 'ob'],
      ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'ob', 'ob', 'ob', 'ob'],
      ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'ob', 'ob', 'ob', 'ob'],
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
      ['ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob', 'ob'],
    ];
  }

  startGame = () => {
    $('.toggle-direction').on('click', this.toggleDirection);
    $('.ship').on('click', this.chooseShip);
    $('.space').on('mouseover', this.spaceMouseoverEvent);
    $('.space').on('mouseleave', this.spaceMouseleaveEvent);
    $('.space').on('click', this.spaceClickEvent);
    $('.enemy-space').click((event) => {
      const spaceCoordinates = event.target.dataset.value.split(',');
      this.enemyShipPlacement(spaceCoordinates);
    });
  }

  // ship placement

  chooseShip = (event) => {
    const ship = event.target.classList[1];
    this.ship = ship;
  }

  toggleDirection = () => {
    if (this.horizontal === 1) {
      this.horizontal = 0;
      this.vertical = 1;
    } else {
      this.horizontal = 1;
      this.vertical = 0;
    }
  }

  checkIfOutOfBounds = (space1, space2, space3, space4, space5) => {
    if (this.ship === 'carrier') {
      if (space1 === '.ss' || space2 === '.ob' || space2 === '.ss' || space3 === '.ob' || space3 === '.ss' || space4 === '.ob' || space4 === '.ss' || space5 === '.ob' || space5 === '.ss') {
        this.oob = true;
      } else {
        this.oob = false;
      }
    }

    if (this.ship === 'battleship') {
      if (space1 === '.ss' || space2 === '.ob' || space2 === '.ss' || space3 === '.ob' || space3 === '.ss' || space4 === '.ob' || space4 === '.ss') {
        this.oob = true;
      } else {
        this.oob = false;
      }
    }

    if (this.ship === 'cruiser' || this.ship === 'submarine') {
      if (space1 === '.ss' || space2 === '.ob' || space2 === '.ss' || space3 === '.ob' || space3 === '.ss') {
        this.oob = true;
      } else {
        this.oob = false;
      }
    }

    if (this.ship === 'destroyer') {
      if (space1 === '.ss' || space2 === '.ob' || space2 === '.ss') {
        this.oob = true;
      } else {
        this.oob = false;
      }
    }
  }

  spaceSelection = (spaceCoordinates, color) => {
    const spaceX = Number(spaceCoordinates[1]);
    const spaceY = Number(spaceCoordinates[0]);
    const space1 = `.${this.spaces[spaceY][spaceX]}`;
    const space2 = `.${this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)]}`;
    const space3 = `.${this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)]}`;
    const space4 = `.${this.spaces[spaceY + (this.vertical * 3)][spaceX + (this.horizontal * 3)]}`;
    const space5 = `.${this.spaces[spaceY + (this.vertical * 4)][spaceX + (this.horizontal * 4)]}`;

    this.checkIfOutOfBounds(space1, space2, space3, space4, space5);

    if (this.ship === 'carrier' && (!this.oob || color === 'white')) {
      $(space1).css('background', color);
      $(space2).css('background', color);
      $(space3).css('background', color);
      $(space4).css('background', color);
      $(space5).css('background', color);
    } else if (this.ship === 'carrier' && this.oob) {
      $(space1).css('background', 'red');
      $(space2).css('background', 'red');
      $(space3).css('background', 'red');
      $(space4).css('background', 'red');
      $(space5).css('background', 'red');
    }

    if (this.ship === 'battleship' && (!this.oob || color === 'white')) {
      $(space1).css('background', color);
      $(space2).css('background', color);
      $(space3).css('background', color);
      $(space4).css('background', color);
    } else if (this.ship === 'battleship' && this.oob) {
      $(space1).css('background', 'red');
      $(space2).css('background', 'red');
      $(space3).css('background', 'red');
      $(space4).css('background', 'red');
    }

    if ((this.ship === 'cruiser' || this.ship === 'submarine') && (!this.oob || color === 'white')) {
      $(space1).css('background', color);
      $(space2).css('background', color);
      $(space3).css('background', color);
    } else if ((this.ship === 'cruiser' || this.ship === 'submarine') && this.oob) {
      $(space1).css('background', 'red');
      $(space2).css('background', 'red');
      $(space3).css('background', 'red');
    }

    if (this.ship === 'destroyer' && (!this.oob || color === 'white')) {
      $(space1).css('background', color);
      $(space2).css('background', color);
    } else if (this.ship === 'destroyer' && this.oob) {
      $(space1).css('background', 'red');
      $(space2).css('background', 'red');
    }
  }

  confirmSelection = (spaceCoordinates) => {
    const spaceX = Number(spaceCoordinates[1]);
    const spaceY = Number(spaceCoordinates[0]);
    if (this.ship === 'carrier') {
      this.mySelection[0].location.push(this.spaces[spaceY][spaceX]);
      this.mySelection[0].location.push(this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)]);
      this.mySelection[0].location.push(this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)]);
      this.mySelection[0].location.push(this.spaces[spaceY + (this.vertical * 3)][spaceX + (this.horizontal * 3)]);
      this.mySelection[0].location.push(this.spaces[spaceY + (this.vertical * 4)][spaceX + (this.horizontal * 4)]);

      this.spaces[spaceY][spaceX] = 'ss';
      this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)] = 'ss';
      this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)] = 'ss';
      this.spaces[spaceY + (this.vertical * 3)][spaceX + (this.horizontal * 3)] = 'ss';
      this.spaces[spaceY + (this.vertical * 4)][spaceX + (this.horizontal * 4)] = 'ss';
      $('.carrier').hide();
      this.ship = '';
    }
    if (this.ship === 'battleship') {
      this.mySelection[1].location.push(this.spaces[spaceY][spaceX]);
      this.mySelection[1].location.push(this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)]);
      this.mySelection[1].location.push(this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)]);
      this.mySelection[1].location.push(this.spaces[spaceY + (this.vertical * 3)][spaceX + (this.horizontal * 3)]);

      this.spaces[spaceY][spaceX] = 'ss';
      this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)] = 'ss';
      this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)] = 'ss';
      this.spaces[spaceY + (this.vertical * 3)][spaceX + (this.horizontal * 3)] = 'ss';
      $('.battleship').hide();
      this.ship = '';
    }
    if (this.ship === 'cruiser') {
      this.mySelection[2].location.push(this.spaces[spaceY][spaceX]);
      this.mySelection[2].location.push(this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)]);
      this.mySelection[2].location.push(this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)]);

      this.spaces[spaceY][spaceX] = 'ss';
      this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)] = 'ss';
      this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)] = 'ss';
      $('.cruiser').hide();
      this.ship = '';
    }
    if (this.ship === 'submarine') {
      this.mySelection[3].location.push(this.spaces[spaceY][spaceX]);
      this.mySelection[3].location.push(this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)]);
      this.mySelection[3].location.push(this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)]);

      this.spaces[spaceY][spaceX] = 'ss';
      this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)] = 'ss';
      this.spaces[spaceY + (this.vertical * 2)][spaceX + (this.horizontal * 2)] = 'ss';
      $('.submarine').hide();
      this.ship = '';
    }
    if (this.ship === 'destroyer') {
      this.mySelection[4].location.push(this.spaces[spaceY][spaceX]);
      this.mySelection[4].location.push(this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)]);

      this.spaces[spaceY][spaceX] = 'ss';
      this.spaces[spaceY + (this.vertical * 1)][spaceX + (this.horizontal * 1)] = 'ss';
      $('.destroyer').hide();
      this.ship = '';
    }
  }

  spaceMouseoverEvent = event => this.spaceSelection(event.target.dataset.value.split(','), 'lightblue');

  spaceMouseleaveEvent = event => this.spaceSelection(event.target.dataset.value.split(','), 'white');

  spaceClickEvent = (event) => {
    if (!this.oob) {
      const spaceCoordinates = event.target.dataset.value.split(',');
      this.spaceSelection(spaceCoordinates, 'blue');
      this.confirmSelection(spaceCoordinates);
    }
  };

  // enemy random ship placement

  rng = range => Math.floor(Math.random() * range);

  randomShipPlacement = (shipName) => {
    let ship = [];
    do {
      const direction = this.rng(2);
      const spaceX = this.rng(8);
      const spaceY = this.rng(8);
      ship = [];

      if (shipName === 'carrier') {
        ship.push(this.enemySpaces[spaceY][spaceX]);
        ship.push(this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 3)][spaceX + (direction * 3)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 4)][spaceX + (direction * 4)]);
      }
      if (shipName === 'carrier' && !ship.includes('ob') && !ship.includes('ss')) {
        this.enemySpaces[spaceY][spaceX] = 'ss';
        this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 3)][spaceX + (direction * 3)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 4)][spaceX + (direction * 4)] = 'ss';
      }

      if (shipName === 'battleship') {
        ship.push(this.enemySpaces[spaceY][spaceX]);
        ship.push(this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 3)][spaceX + (direction * 3)]);
      }
      if (shipName === 'battleship' && !ship.includes('ob') && !ship.includes('ss')) {
        this.enemySpaces[spaceY][spaceX] = 'ss';
        this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 3)][spaceX + (direction * 3)] = 'ss';
      }

      if (shipName === 'cruiser') {
        ship.push(this.enemySpaces[spaceY][spaceX]);
        ship.push(this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)]);
      }
      if (shipName === 'cruiser' && !ship.includes('ob') && !ship.includes('ss')) {
        this.enemySpaces[spaceY][spaceX] = 'ss';
        this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)] = 'ss';
      }

      if (shipName === 'submarine') {
        ship.push(this.enemySpaces[spaceY][spaceX]);
        ship.push(this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)]);
        ship.push(this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)]);
      }
      if (shipName === 'submarine' && !ship.includes('ob') && !ship.includes('ss')) {
        this.enemySpaces[spaceY][spaceX] = 'ss';
        this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)] = 'ss';
        this.enemySpaces[spaceY + (((direction - 1) * -1) * 2)][spaceX + (direction * 2)] = 'ss';
      }

      if (shipName === 'destroyer') {
        ship.push(this.enemySpaces[spaceY][spaceX]);
        ship.push(this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)]);
      }
      if (shipName === 'destroyer' && !ship.includes('ob') && !ship.includes('ss')) {
        this.enemySpaces[spaceY][spaceX] = 'ss';
        this.enemySpaces[spaceY + ((direction - 1) * -1)][spaceX + (direction * 1)] = 'ss';
      }
    }
    while (ship.includes('ob') || ship.includes('ss'));
    return ship;
  }

  getEnemyShipLocations = () => {
    const enemySelection = [
      {
        ship: 'carrier',
        location: this.randomShipPlacement('carrier'),
        spacesFound: 0,
      },
      {
        ship: 'battleship',
        location: this.randomShipPlacement('battleship'),
        spacesFound: 0,
      },
      {
        ship: 'cruiser',
        location: this.randomShipPlacement('cruiser'),
        spacesFound: 0,
      },
      {
        ship: 'submarine',
        location: this.randomShipPlacement('submarine'),
        spacesFound: 0,
      },
      {
        ship: 'destroyer',
        location: this.randomShipPlacement('destroyer'),
        spacesFound: 0,
      },
    ];
    return enemySelection;
  }

  // this.enemySelection = this.getEnemyShipLocations();

  // enemy selection

  enemyShipPlacement = (spaceCoordinates) => {
    const spaceX = Number(spaceCoordinates[1]);
    const spaceY = Number(spaceCoordinates[0]);
    const spaceId = this.spacesReference[spaceY][spaceX];
    const spaceState = this.enemySpaces[spaceY][spaceX];
    if (spaceState === 'ss') {
      this.enemySelection.forEach((ship) => {
        if (ship.location.includes(spaceId)) {
          // ship.location[ship.location.indexOf(spaceId)] = '';
          // ship.spacesFound += 1;
        }
      });
      $(`.${spaceId}-e`).css('background-color', 'green');
    } else {
      $(`.${spaceId}-e`).css('background-color', 'grey');
    }
  }

  componentDidMount() {
    this.setDefaultValues();
    this.enemySelection = this.getEnemyShipLocations();
    this.startGame();
  }

  render() {
    return (
      <div className="container mt-5">

        <div className="d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-header">Ships</div>
            <div className="card-body">
              <blockquote className="blockquote">
                <div className="ship carrier">Carrier x5</div>
                <div className="ship battleship">Battleship x4</div>
                <div className="ship cruiser">Cruiser x3</div>
                <div className="ship submarine">Submarine x3</div>
                <div className="ship destroyer mb-3">Destroyer x2</div>
                <button className="toggle-direction btn btn-dark" type="button">Toggle Orientation</button>
                <footer className="blockquote-footer">Click to toggle ship orientation</footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
          <div className="position-relative">
            {/* <div className="position-absolute h-100 w-100 bg-black z-1 board-overlay"></div> */}
            <div className="board">
              <div className="row m-0">
                <div data-value="0,0" className="a1 space col"></div>
                <div data-value="0,1" className="a2 space col"></div>
                <div data-value="0,2" className="a3 space col"></div>
                <div data-value="0,3" className="a4 space col"></div>
                <div data-value="0,4" className="a5 space col"></div>
                <div data-value="0,5" className="a6 space col"></div>
                <div data-value="0,6" className="a7 space col"></div>
                <div data-value="0,7" className="a8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="1,0" className="b1 space col"></div>
                <div data-value="1,1" className="b2 space col"></div>
                <div data-value="1,2" className="b3 space col"></div>
                <div data-value="1,3" className="b4 space col"></div>
                <div data-value="1,4" className="b5 space col"></div>
                <div data-value="1,5" className="b6 space col"></div>
                <div data-value="1,6" className="b7 space col"></div>
                <div data-value="1,7" className="b8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="2,0" className="c1 space col"></div>
                <div data-value="2,1" className="c2 space col"></div>
                <div data-value="2,2" className="c3 space col"></div>
                <div data-value="2,3" className="c4 space col"></div>
                <div data-value="2,4" className="c5 space col"></div>
                <div data-value="2,5" className="c6 space col"></div>
                <div data-value="2,6" className="c7 space col"></div>
                <div data-value="2,7" className="c8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="3,0" className="d1 space col"></div>
                <div data-value="3,1" className="d2 space col"></div>
                <div data-value="3,2" className="d3 space col"></div>
                <div data-value="3,3" className="d4 space col"></div>
                <div data-value="3,4" className="d5 space col"></div>
                <div data-value="3,5" className="d6 space col"></div>
                <div data-value="3,6" className="d7 space col"></div>
                <div data-value="3,7" className="d8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="4,0" className="e1 space col"></div>
                <div data-value="4,1" className="e2 space col"></div>
                <div data-value="4,2" className="e3 space col"></div>
                <div data-value="4,3" className="e4 space col"></div>
                <div data-value="4,4" className="e5 space col"></div>
                <div data-value="4,5" className="e6 space col"></div>
                <div data-value="4,6" className="e7 space col"></div>
                <div data-value="4,7" className="e8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="5,0" className="f1 space col"></div>
                <div data-value="5,1" className="f2 space col"></div>
                <div data-value="5,2" className="f3 space col"></div>
                <div data-value="5,3" className="f4 space col"></div>
                <div data-value="5,4" className="f5 space col"></div>
                <div data-value="5,5" className="f6 space col"></div>
                <div data-value="5,6" className="f7 space col"></div>
                <div data-value="5,7" className="f8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="6,0" className="g1 space col"></div>
                <div data-value="6,1" className="g2 space col"></div>
                <div data-value="6,2" className="g3 space col"></div>
                <div data-value="6,3" className="g4 space col"></div>
                <div data-value="6,4" className="g5 space col"></div>
                <div data-value="6,5" className="g6 space col"></div>
                <div data-value="6,6" className="g7 space col"></div>
                <div data-value="6,7" className="g8 space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="7,0" className="h1 space col m-0"></div>
                <div data-value="7,1" className="h2 space col m-0"></div>
                <div data-value="7,2" className="h3 space col m-0"></div>
                <div data-value="7,3" className="h4 space col m-0"></div>
                <div data-value="7,4" className="h5 space col m-0"></div>
                <div data-value="7,5" className="h6 space col m-0"></div>
                <div data-value="7,6" className="h7 space col m-0"></div>
                <div data-value="7,7" className="h8 space col m-0"></div>
              </div>
            </div>
          </div>

          <div className="position-relative">
            {/* <div className="position-absolute h-100 w-100 bg-black z-1 enemyboard-overlay"></div> */}
            <div className="enemy-board">
              <div className="row m-0">
                <div data-value="0,0" className="a1-e enemy-space col"></div>
                <div data-value="0,1" className="a2-e enemy-space col"></div>
                <div data-value="0,2" className="a3-e enemy-space col"></div>
                <div data-value="0,3" className="a4-e enemy-space col"></div>
                <div data-value="0,4" className="a5-e enemy-space col"></div>
                <div data-value="0,5" className="a6-e enemy-space col"></div>
                <div data-value="0,6" className="a7-e enemy-space col"></div>
                <div data-value="0,7" className="a8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="1,0" className="b1-e enemy-space col"></div>
                <div data-value="1,1" className="b2-e enemy-space col"></div>
                <div data-value="1,2" className="b3-e enemy-space col"></div>
                <div data-value="1,3" className="b4-e enemy-space col"></div>
                <div data-value="1,4" className="b5-e enemy-space col"></div>
                <div data-value="1,5" className="b6-e enemy-space col"></div>
                <div data-value="1,6" className="b7-e enemy-space col"></div>
                <div data-value="1,7" className="b8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="2,0" className="c1-e enemy-space col"></div>
                <div data-value="2,1" className="c2-e enemy-space col"></div>
                <div data-value="2,2" className="c3-e enemy-space col"></div>
                <div data-value="2,3" className="c4-e enemy-space col"></div>
                <div data-value="2,4" className="c5-e enemy-space col"></div>
                <div data-value="2,5" className="c6-e enemy-space col"></div>
                <div data-value="2,6" className="c7-e enemy-space col"></div>
                <div data-value="2,7" className="c8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="3,0" className="d1-e enemy-space col"></div>
                <div data-value="3,1" className="d2-e enemy-space col"></div>
                <div data-value="3,2" className="d3-e enemy-space col"></div>
                <div data-value="3,3" className="d4-e enemy-space col"></div>
                <div data-value="3,4" className="d5-e enemy-space col"></div>
                <div data-value="3,5" className="d6-e enemy-space col"></div>
                <div data-value="3,6" className="d7-e enemy-space col"></div>
                <div data-value="3,7" className="d8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="4,0" className="e1-e enemy-space col"></div>
                <div data-value="4,1" className="e2-e enemy-space col"></div>
                <div data-value="4,2" className="e3-e enemy-space col"></div>
                <div data-value="4,3" className="e4-e enemy-space col"></div>
                <div data-value="4,4" className="e5-e enemy-space col"></div>
                <div data-value="4,5" className="e6-e enemy-space col"></div>
                <div data-value="4,6" className="e7-e enemy-space col"></div>
                <div data-value="4,7" className="e8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="5,0" className="f1-e enemy-space col"></div>
                <div data-value="5,1" className="f2-e enemy-space col"></div>
                <div data-value="5,2" className="f3-e enemy-space col"></div>
                <div data-value="5,3" className="f4-e enemy-space col"></div>
                <div data-value="5,4" className="f5-e enemy-space col"></div>
                <div data-value="5,5" className="f6-e enemy-space col"></div>
                <div data-value="5,6" className="f7-e enemy-space col"></div>
                <div data-value="5,7" className="f8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="6,0" className="g1-e enemy-space col"></div>
                <div data-value="6,1" className="g2-e enemy-space col"></div>
                <div data-value="6,2" className="g3-e enemy-space col"></div>
                <div data-value="6,3" className="g4-e enemy-space col"></div>
                <div data-value="6,4" className="g5-e enemy-space col"></div>
                <div data-value="6,5" className="g6-e enemy-space col"></div>
                <div data-value="6,6" className="g7-e enemy-space col"></div>
                <div data-value="6,7" className="g8-e enemy-space col"></div>
              </div>
              <div className="row m-0">
                <div data-value="7,0" className="h1-e enemy-space col"></div>
                <div data-value="7,1" className="h2-e enemy-space col"></div>
                <div data-value="7,2" className="h3-e enemy-space col"></div>
                <div data-value="7,3" className="h4-e enemy-space col"></div>
                <div data-value="7,4" className="h5-e enemy-space col"></div>
                <div data-value="7,5" className="h6-e enemy-space col"></div>
                <div data-value="7,6" className="h7-e enemy-space col"></div>
                <div data-value="7,7" className="h8-e enemy-space col"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Battleship;
