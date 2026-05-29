"""차량번호·차종 → TTS용 한글 읽기 변환"""

import re

from .model_speech_dict import MODEL_SPEECH

# 번호판: 숫자 한 자리씩 (50너2560 → 오공너이오육공)
_PLATE_DIGIT = {
    "0": "공",
    "1": "일",
    "2": "이",
    "3": "삼",
    "4": "사",
    "5": "오",
    "6": "육",
    "7": "칠",
    "8": "팔",
    "9": "구",
}

# 차종 코드 폴백(사전에 없을 때): 글자·숫자 한 자리씩
_LETTER = {
    "A": "에이",
    "B": "비",
    "C": "씨",
    "D": "디",
    "E": "이",
    "F": "에프",
    "G": "지",
    "H": "에이치",
    "I": "아이",
    "J": "제이",
    "K": "케이",
    "L": "엘",
    "M": "엠",
    "N": "엔",
    "O": "오",
    "P": "피",
    "Q": "큐",
    "R": "알",
    "S": "에스",
    "T": "티",
    "U": "유",
    "V": "브이",
    "W": "더블유",
    "X": "엑스",
    "Y": "와이",
    "Z": "제트",
}

# 폴백용 차종 숫자 (0=공, 6=식 등 — 모델마다 다르므로 사전 우선)
_MODEL_DIGIT_FALLBACK = {
    "0": "공",
    "1": "일",
    "2": "이",
    "3": "삼",
    "4": "사",
    "5": "오",
    "6": "식",
    "7": "칠",
    "8": "팔",
    "9": "구",
}

# 영문 숫자 읽기 (SM3 등 — 사전 등록 권장)
_ENGLISH_DIGIT = {
    "0": "제로",
    "1": "원",
    "2": "투",
    "3": "쓰리",
    "4": "포",
    "5": "파이브",
    "6": "식스",
    "7": "세븐",
    "8": "에이트",
    "9": "나인",
}


def plate_to_speech(plate: str) -> str:
    """
    번호판: 숫자는 한 자리씩 읽기.
    50너2560 → 오공너이오육공
    12가3456 → 일이가삼사오육
    """
    plate = plate.strip().replace(" ", "")
    out: list[str] = []
    for ch in plate:
        if ch.isdigit():
            out.append(_PLATE_DIGIT[ch])
        else:
            out.append(ch)
    return "".join(out)


def _normalize_model_key(model: str) -> str:
    return re.sub(r"\s+", "", model).upper()


def _lookup_model(key: str) -> str | None:
    if key in MODEL_SPEECH:
        return MODEL_SPEECH[key]
    return None


def _spell_model_fallback(code: str) -> str:
    """사전에 없는 영숫자 차종 — 글자·숫자 한 자리씩 (최선)"""
    out: list[str] = []
    for ch in code:
        if ch.isalpha():
            out.append(_LETTER.get(ch, ch))
        elif ch.isdigit():
            out.append(_MODEL_DIGIT_FALLBACK[ch])
    return "".join(out)


def model_to_speech(model: str) -> str:
    """
    차종: 사전 우선, 없으면 글자·숫자 분해.
    QM6→큐엠식, GV70→지브이칠공, SM3→에스엠쓰리, G70→지칠공
    """
    raw = model.strip()
    if not raw:
        return ""

    # 순수 한글 차명
    if re.fullmatch(r"[가-힣\s·]+", raw):
        return raw.replace(" ", "").replace("·", "")

    key = _normalize_model_key(raw)
    hit = _lookup_model(key)
    if hit:
        return hit

    # 앞부분 코드만 영숫자인 경우 (예: "GV70 어반" → GV70 + 어반)
    m = re.match(r"^([A-Za-z0-9]+)", raw)
    if m:
        code_key = m.group(1).upper()
        hit = _lookup_model(code_key)
        tail = raw[len(m.group(1)) :].strip()
        if hit:
            if tail and re.search(r"[가-힣]", tail):
                return hit + tail.replace(" ", "")
            return hit
        if re.fullmatch(r"[A-Za-z0-9]+", code_key):
            spoken = _spell_model_fallback(code_key)
            if tail and re.search(r"[가-힣]", tail):
                return spoken + tail.replace(" ", "")
            return spoken

    return _spell_model_fallback(key)


def build_announce_text(plate_number: str, vehicle_model: str) -> str:
    plate_sp = plate_to_speech(plate_number)
    model_sp = model_to_speech(vehicle_model)
    return f"{plate_sp} {model_sp} 차주님, 판정실로 와주시길 바랍니다."
