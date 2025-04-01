import React, {useEffect, useMemo, useRef} from 'react';
import RGL, {Layout, WidthProvider} from 'react-grid-layout';
import {useNavigate} from 'react-router-dom';
import {useProfile} from '../contexts/ProfileContext';
import {
  ProfileWidgetItemSize,
  ProfileWidgetItemType,
} from '../types/WidgetItemType';
import WidgetItem from './WidgetItem';

// react-grid-layout에 width 자동 적용
const ReactGridLayout = WidthProvider(RGL);
const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;
const CONTAINER_GAP = 24;
const PADDING_WIDTH = WIDTH * 0.06;
const CELL_CONTAINER_WIDTH = WIDTH - 2 * PADDING_WIDTH - 4;

// 그리드 설정
const GRID_COLS = 2;

export function getGridDimensions(sizeType: ProfileWidgetItemSize) {
  switch (sizeType) {
    case 'SMALL':
      return {
        w: 1,
        h: 1,
      };
    case 'LONG':
      return {
        w: 2,
        h: 1,
      };
    case 'BIG':
      return {
        w: 1,
        h: 3,
      };

    default:
      return {w: 1, h: 1};
  }
}

/**
 * "아이템 or 그룹"을 구분해서, react-grid-layout의 Layout으로 변환
 * @param widgetItem - ProfileWidgetItemType | ProfileWidgetItemType[]
 * @param index
 */
function makeLayoutItem(
  item: ProfileWidgetItemType,
  isInitialRender: boolean,
): Layout {
  const {w, h} = getGridDimensions(item.sizeType);
  const x = isInitialRender
    ? item.coordinate?.x === 0
      ? 0
      : item.coordinate?.x === 3
        ? 1
        : item.coordinate?.x
    : item.coordinate?.x || 0;

  const y = item.coordinate?.y || 0;
  const id = item.isEmWidget ? 'em_' + item.id : 'custom_' + item.id;
  return {
    i: id, // 고유 key
    x: x,
    y: y,
    w,
    h,

    static: false,
  };
}

export default function MainProfileGrid() {
  const navigate = useNavigate();
  const {
    currentWidgets,

    setIsEditing,
    firstLoad,
    setShowSave,
    setCurrentWidgets,
    isEditing,
    isMyLink,
    setDeletedWidgetItems,
    setSelectedItem,
    setIsEditingItem,
    userData,
  } = useProfile();
  const isInitialRenderRef = useRef(true);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    return () => {
      isInitialRenderRef.current = false;
    };
  }, []);
  const layout = useMemo<Layout[]>(() => {
    return currentWidgets.map(
      (widgetItem: ProfileWidgetItemType, idx: number) =>
        makeLayoutItem(widgetItem, isInitialRenderRef.current),
    );
  }, [currentWidgets]);
  async function onDeleteWidget(item: ProfileWidgetItemType) {
    setCurrentWidgets((prev: ProfileWidgetItemType[]) => {
      const newWidgets = prev.filter((widget: ProfileWidgetItemType) => {
        if (Array.isArray(widget)) {
          return widget.some(w => w.id !== item.id);
        }
        return widget.id !== item.id;
      });
      return newWidgets;
    });

    setDeletedWidgetItems(prev => [...prev, item]);
  }
  /** onLayoutChange 콜백 - 위젯 위치 변경 시 저장 */
  const handleLayoutChange = (currentLayout: Layout[]) => {
    if (!isEditing) return;
    console.log('Updated layout:', currentLayout);

    firstLoadRef.current = false;
    // (A) currentLayout의 각 아이템 -> widgets의 item 매핑
    setCurrentWidgets(prevWidgets => {
      return prevWidgets.map(widget => {
        const found = currentLayout.find(
          l => l.i === (widget.isEmWidget ? 'em_' : 'custom_') + widget.id,
        );
        if (found) {
          return {
            ...widget,
            coordinate: {
              x: found.x,
              y: found.y,
            },
          };
        }
        return widget;
      });
    });
  };
  const onEditWidget = (item: ProfileWidgetItemType) => {
    setSelectedItem(item);
    setIsEditingItem(true);

    navigate('/' + userData?.nameTag + '/set-widget', {
      state: {
        isEditMode: true,
      },
    });
  };
  const cellSize = (CELL_CONTAINER_WIDTH - (6 - 1) * CONTAINER_GAP) / 6;

  const rowHeight = cellSize;

  return (
    <ReactGridLayout
      layout={layout}
      cols={GRID_COLS}
      rowHeight={rowHeight}
      containerPadding={[0, 0]}
      width={CELL_CONTAINER_WIDTH + 2 * PADDING_WIDTH}
      margin={[CONTAINER_GAP, CONTAINER_GAP]}
      onLayoutChange={handleLayoutChange}
      isDraggable={isEditing}
      onDragStop={() => {
        setShowSave(true);
      }}
      isResizable={false}
      draggableCancel=".widget-button"
      compactType={'vertical'}
      preventCollision={false}>
      {currentWidgets.map((widgetItem: ProfileWidgetItemType) => {
        const keyStr = String(
          (widgetItem.isEmWidget ? 'em_' : 'custom_') + widgetItem.id,
        );

        return (
          <div
            key={keyStr}
            style={{width: '100%', height: '100%', boxSizing: 'border-box'}}>
            <WidgetItem
              widget={widgetItem}
              isEditMode={isEditing}
              onDeleteWidget={onDeleteWidget}
              onEditWidget={onEditWidget}
              userInfo={userData?.linkedUserInfo}
            />
          </div>
        );
      })}
    </ReactGridLayout>
  );
}
