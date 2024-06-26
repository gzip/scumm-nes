import parseRooms from './parseRooms.js';
import parseRoomGfx from './parseRoomGfx.js';
import parseGlobdata from './parseGlobdata.js';
import parseScript from './parseScript.js';
import parseCostumeGfx from './costumes/parseCostumeGfx.js';
import parseCostumes from './costumes/parseCostumes.js';
import parseSprpals from './costumes/parseSprpals.js';
import parseSprdesc from './costumes/parseSprdesc.js';
import parseSprlens from './costumes/parseSprlens.js';
import parseSproffs from './costumes/parseSproffs.js';
import parseSprdata from './costumes/parseSprdata.js';
import parsePreps from './parsePreps.js';
import parseTitles from './parseTitles.js';

const parseRom = (arrayBuffer, res) => {
  const rooms = [];
  const roomgfx = [];
  const globdata = [];
  const scripts = [];
  const costumegfx = [];
  const costumes = [];
  const sprpals = [];
  const sprdesc = [];
  const sproffs = [];
  const sprlens = [];
  const sprdata = [];
  const preps = [];
  const titles = [];

  for (let i = 0; i < res?.rooms?.length; i++) {
    const [offset, length] = res.rooms[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseRooms(buffer, i, offset, res.characters);
    item.buffer = buffer;
    rooms.push(item);
  }

  for (let i = 0; i < res?.roomgfx?.length; i++) {
    const [offset, length] = res.roomgfx[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseRoomGfx(buffer, i, offset);
    item.buffer = buffer;
    roomgfx.push(item);
  }

  for (let i = 0; i < res?.globdata?.length; i++) {
    const [offset, length] = res.globdata[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseGlobdata(buffer, i, offset);
    item.buffer = buffer;
    globdata.push(item);
  }

  for (let i = 0; i < res.scripts.length; i++) {
    const [offset, length] = res.scripts[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseScript(buffer, i, offset, res.characters);
    item.buffer = buffer;
    scripts.push(item);
  }

  for (let i = 0; i < res.costumegfx.length; i++) {
    const [offset, length] = res.costumegfx[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseCostumeGfx(buffer, i, offset);
    item.buffer = buffer;
    costumegfx.push(item);
  }

  for (let i = 0; i < res.costumes.length; i++) {
    const [offset, length] = res.costumes[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseCostumes(buffer, i, offset);
    item.buffer = buffer;
    costumes.push(item);
  }

  for (let i = 0; i < res.sprpals.length; i++) {
    const [offset, length] = res.sprpals[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprpals(buffer, i, offset);
    item.buffer = buffer;
    sprpals.push(item);
  }

  for (let i = 0; i < res.sprdesc.length; i++) {
    const [offset, length] = res.sprdesc[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprdesc(buffer, i, offset);
    item.buffer = buffer;
    sprdesc.push(item);
  }

  for (let i = 0; i < res.sproffs.length; i++) {
    const [offset, length] = res.sproffs[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSproffs(buffer, i, offset);
    item.buffer = buffer;
    sproffs.push(item);
  }

  for (let i = 0; i < res.sprlens.length; i++) {
    const [offset, length] = res.sprlens[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprlens(buffer, i, offset);
    item.buffer = buffer;
    sprlens.push(item);
  }

  // @todo Assert that the highest value of sprdesc is within sprlens and sproffs.
  // @todo Assert that sprlens and sproffs have the same length.

  for (let i = 0; i < res.sprdata.length; i++) {
    const [offset, length] = res.sprdata[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprdata(buffer, i, offset);
    item.buffer = buffer;
    sprdata.push(item);
  }

  // @todo Assert that the highest value of sproffs is within sprdata.

  for (let i = 0; i < res?.preplist?.length; i++) {
    const [offset, length] = res.preplist[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parsePreps(buffer, i, offset, res.characters);
    item.buffer = buffer;
    preps.push(item);
  }

  // The title screens are stored outside of SCUMM.
  for (let i = 0; i < res?.titles?.length; i++) {
    const [offset] = res.titles[i];

    // @todo Figure out the length of the title chunks.
    const buffer = arrayBuffer.slice(offset); //, offset + length);
    const item = parseTitles(buffer, i, offset);
    item.buffer = buffer;
    titles.push(item);
  }

  return {
    rooms,
    roomgfx,
    globdata,
    scripts,
    costumegfx,
    costumes,
    sprpals,
    sprdesc,
    sproffs,
    sprlens,
    sprdata,
    preps,
    titles,
  };
};

export default parseRom;
