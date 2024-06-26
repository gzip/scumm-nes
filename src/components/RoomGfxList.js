import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const RoomGfxList = ({ gfx, currentId }) => {
  return (
    <>
      <ColumnListHeader>Room gfx</ColumnListHeader>
      {gfx.map(({ metadata }) => {
        const selected = metadata.id === currentId;
        const path = `/roomgfx/${metadata.id}`;
        const label = `Tileset ${metadata.id}`;

        return (
          <ColumnListItem
            key={metadata.id}
            path={selected ? null : path}>
            {label}
          </ColumnListItem>
        );
      })}
    </>
  );
};

export default RoomGfxList;
