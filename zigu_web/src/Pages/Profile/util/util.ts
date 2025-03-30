import { useUserStore } from "../../../storage/userStore";
import { getGridDimensions } from "../components/MainProfileGrid";
import { ProfileWidgetItemSize } from "../types/WidgetItemType";

/**
 * 2컬럼 그리드에서,
 * - 새 위젯을 "아래쪽 클러스터" (최근 maxY 근처)에서 빈 칸이 있으면 그곳에 배치하고,
 * - 없으면 새 행(새로운 y = maxY)에 배치한다.
 *
 * 이 방식은 위젯의 w와 h에 따라 배치 가능 여부를 판단하며,
 * 만약 클러스터 내(예: 최근 3행)에서 빈 칸이 있으면 그 중 가장 위쪽에 배치하도록 한다.
 */
export function calculateNewWidgetCoordinate(
    newWidgetSize: ProfileWidgetItemSize
): { x: number; y: number } {
    const { myWidgets } = useUserStore.getState();
    const GRID_COLS = 2;

    // 새 위젯의 크기 (예: SMALL: {w:1, h:1}, LONG: {w:2, h:1}, BIG: {w:1, h:3})
    const { w, h } = getGridDimensions(newWidgetSize);

    // 위젯이 하나도 없으면 (0,0)에 배치
    if (!myWidgets || myWidgets.length === 0) {
        return { x: 0, y: 0 };
    }

    // 1) 기존 위젯들이 차지하는 최대 y (즉, 아래쪽 끝) 구하기
    let maxY = 0;
    myWidgets.forEach(widget => {
        const widgetDim = getGridDimensions(widget.sizeType);
        const wy = widget.coordinate?.y ?? 0;
        maxY = Math.max(maxY, wy + widgetDim.h);
    });

    // 2) occupiedCells 배열 생성 (0부터 MAX_ROWS까지, 여기서는 maxY+여유로)
    const MAX_ROWS = maxY + 10; // 여유를 둠
    const occupiedCells: boolean[][] = [];
    for (let row = 0; row < MAX_ROWS; row++) {
        occupiedCells[row] = new Array<boolean>(GRID_COLS).fill(false);
    }

    // 3) 기존 위젯들이 차지하는 영역을 표시
    myWidgets.forEach(widget => {
        const wd = getGridDimensions(widget.sizeType);
        const x = widget.coordinate?.x ?? 0;
        const y = widget.coordinate?.y ?? 0;
        for (let ry = y; ry < y + wd.h; ry++) {
            if (ry >= MAX_ROWS) break;
            for (let cx = x; cx < x + wd.w; cx++) {
                if (cx < GRID_COLS) {
                    occupiedCells[ry][cx] = true;
                }
            }
        }
    });

    // 4) "아래쪽 클러스터" 내에서 빈 칸을 찾는다.
    //    클러스터 범위: maxY - THRESHOLD ~ maxY-1 (예를 들어, THRESHOLD = 3)
    const THRESHOLD = newWidgetSize === 'BIG' ? 3 : 1; // BIG은 높이 3, SMALL/ LONG은 1
    let candidate: { x: number; y: number } | null = null;
    // 시작행: 가능한 최소 시작행 = maxY - THRESHOLD (보통 새 위젯이 들어갈 수 있는 클러스터 상단)
    let startRow = maxY - THRESHOLD;
    if (startRow < 0) startRow = 0;

    // 아래쪽 클러스터 범위: startRow 부터 maxY-1
    for (let row = startRow; row < maxY; row++) {
        // 후보 행에서 가능한 열을 검사
        for (let col = 0; col <= GRID_COLS - w; col++) {
            let canPlace = true;
            for (let rr = row; rr < row + h; rr++) {
                // 만약 해당 행이 범위를 벗어나면 못 놓음
                if (rr >= MAX_ROWS) {
                    canPlace = false;
                    break;
                }
                for (let cc = col; cc < col + w; cc++) {
                    if (cc >= GRID_COLS || occupiedCells[rr][cc]) {
                        canPlace = false;
                        break;
                    }
                }
                if (!canPlace) break;
            }
            if (canPlace) {
                // 여러 후보가 있다면, 클러스터 내에서 가장 위쪽(최소 y)을 선택
                if (candidate === null || row < candidate.y) {
                    candidate = { x: col, y: row };
                }
            }
        }
        // 만약 후보를 찾으면 바로 break(또는 계속 검사를 해서 더 위쪽 후보를 찾을 수도 있음)
        if (candidate !== null) {
            break;
        }
    }


    if (candidate !== null) {
        return candidate;
    }
    return { x: 0, y: maxY };
}
export function getOrdinalSuffix(number: number): string {


    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return `${'th'}`;
    }

    switch (lastDigit) {
        case 1:
            return `${'st'}`;
        case 2:
            return `${'nd'}`;
        case 3:
            return `${'rd'}`;
        default:
            return `${'th'}`;
    }
}


function getRelativeLuminance(hexColor: string): number {
    // hexColor -> 'R', 'G', 'B' (0~255)
    const hex = hexColor.replace('#', '');
    const r8 = parseInt(hex.substring(0, 2), 16);
    const g8 = parseInt(hex.substring(2, 4), 16);
    const b8 = parseInt(hex.substring(4, 6), 16);

    // 0~1 로 표준화
    const r = r8 / 255;
    const g = g8 / 255;
    const b = b8 / 255;

    // 감마 보정 함수
    const transform = (c: number) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const R = transform(r);
    const G = transform(g);
    const B = transform(b);

    // WCAG 권장 계수
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}


export function getTextColorWcag(bgColor: string): string {
    const bgLum = getRelativeLuminance(bgColor);

    // 흰색(#FFF)의 상대 명도: 1.0, 검정(#000)의 상대 명도: 0.0
    const whiteLum = 1.0;
    const blackLum = 0.0;

    // 배경이 밝다면 lighter = bgLum, darker = blackLum 이런 식으로 계산하는 게 일반적이지만,
    // 더 간단히 '흰색 vs 배경색' 대비비, '검정 vs 배경색' 대비비를 둘 다 구한 후 비교합니다.

    // contrastRatio = (Lighter + 0.05) / (Darker + 0.05)
    // 흰색 대비비
    const whiteContrast =
        bgLum > whiteLum
            ? (bgLum + 0.05) / (whiteLum + 0.05)
            : (whiteLum + 0.05) / (bgLum + 0.05);

    // 검정 대비비
    const blackContrast =
        bgLum > blackLum
            ? (bgLum + 0.05) / (blackLum + 0.05)
            : (blackLum + 0.05) / (bgLum + 0.05);

    // 둘 중 더 높은 대비를 주는 색상 선택
    return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
}