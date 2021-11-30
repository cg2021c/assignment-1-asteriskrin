function main() {
    // Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    // Hexagonal calculation
    var hex_r = 0.2;
    var hex_d = Math.sqrt(hex_r*hex_r - (1/4)*hex_r*hex_r);
    var hex_a1 = 4-0.7-0.2;
    var hex_b1 = 2.4/2;
    var hex_a2 = 0.7+0.2;
    var hex_b2 = 2.4/2;

    // Define vertices data for a cube
    var vertices = [
        // Face R1.A.1
        0.5,    0,      0,      1, 1, 1,    0, -1, 0, // Index: 0
        4-0.5,  0,      0,      1, 1, 1,    0, -1, 0, // Index: 1
        4-0.5,  0,      3.9,    1, 1, 1,    0, -1, 0, // Index: 2
        0.5,    0,      3.9,    1, 1, 1,    0, -1, 0, // Index: 3

        // Face R1.A.2
        0.5,    2.4,    0,      1, 1, 1,    0, 1, 0, // Index: 4
        4-0.5,  2.4,    0,      1, 1, 1,    0, 1, 0, // Index: 5
        4-0.5,  2.4,    3.9,    1, 1, 1,    0, 1, 0, // Index: 6
        0.5,    2.4,    3.9,    1, 1, 1,    0, 1, 0, // Index: 7

        // Face R1.A.3
        0,    0.5,          0,      1, 1, 1,    -1, 0, 0, // Index: 8
        0,    2.4-0.5,      0,      1, 1, 1,    -1, 0, 0, // Index: 9
        0,    2.4-0.5,      3.9,    1, 1, 1,    -1, 0, 0, // Index: 10
        0,    0.5,          3.9,    1, 1, 1,    -1, 0, 0, // Index: 11 

        // Face R1.A.4
        4,    0.5,          0,      1, 1, 1,    1, 0, 0, // Index: 12
        4,    2.4-0.5,      0,      1, 1, 1,    1, 0, 0, // Index: 13
        4,    2.4-0.5,      3.9,    1, 1, 1,    1, 0, 0, // Index: 14
        4,    0.5,          3.9,    1, 1, 1,    1, 0, 0, // Index: 15 

        // Face R1.B.1
        0.5,    0,      0,      1,1,1,   -0.7071, -0.7071, 0, // Index: 16
        0,      0.5,    0,      1,1,1,   -0.7071, -0.7071, 0, // Index: 17
        0,      0.5,    3.9,    1,1,1,   -0.7071, -0.7071, 0, // Index: 18
        0.5,    0,      3.9,    1,1,1,   -0.7071, -0.7071, 0, // Index: 19

        // Face R1.B.2
        0,      2.4-0.5,    0,          1,1,1,  -0.7071, 0.7071, 0, // Index: 20
        0.5,    2.4,        0,          1,1,1,  -0.7071, 0.7071, 0, // Index: 21
        0.5,    2.4,        3.9,        1,1,1,  -0.7071, 0.7071, 0, // Index: 22
        0,      2.4-0.5,    3.9,        1,1,1,  -0.7071, 0.7071, 0, // Index: 23

        // Face R1.B.3
        4-0.5,  0,      0,      1,1,1,  0.7071, -0.7071, 0, // Index: 24
        4,      0.5,    0,      1,1,1,  0.7071, -0.7071, 0, // Index: 25
        4,      0.5,    3.9,    1,1,1,  0.7071, -0.7071, 0, // Index: 26
        4-0.5,  0,      3.9,    1,1,1,  0.7071, -0.7071, 0, // Index: 27

        // Face R1.B.4
        4-0.5,  2.4,        0,      1,1,1,      0.7071, 0.7071, 0, // Index: 28
        4,      2.4-0.5,    0,      1,1,1,      0.7071, 0.7071, 0, // Index: 29
        4,      2.4-0.5,    3.9,    1,1,1,      0.7071, 0.7071, 0, // Index: 30
        4-0.5,  2.4,        3.9,    1,1,1,      0.7071, 0.7071, 0, // Index: 31

        // Face R1.C.1
        0,      0.5,        0,      1,1,1,      0, 0, 1, // Index: 32
        0.5,    0,          0,      1,1,1,      0, 0, 1, // Index: 33
        4-0.5,  0,          0,      1,1,1,      0, 0, 1, // Index: 34
        4,      0.5,        0,      1,1,1,      0, 0, 1, // Index: 35
        4,      2.4-0.5,    0,      1,1,1,      0, 0, 1, // Index: 36
        4-0.5,  2.4,        0,      1,1,1,      0, 0, 1, // Index: 37
        0.5,    2.4,        0,      1,1,1,      0, 0, 1, // Index: 38
        0,      2.4-0.5,    0,      1,1,1,      0, 0, 1, // Index: 39

        // Face R1.C.2
        0,      0.5,        3.9,      1,1,1,      0, 0, -1, // Index: 40
        0.5,    0,          3.9,      1,1,1,      0, 0, -1, // Index: 41
        4-0.5,  0,          3.9,      1,1,1,      0, 0, -1, // Index: 42
        4,      0.5,        3.9,      1,1,1,      0, 0, -1, // Index: 43
        4,      2.4-0.5,    3.9,      1,1,1,      0, 0, -1, // Index: 44
        4-0.5,  2.4,        3.9,      1,1,1,      0, 0, -1, // Index: 45
        0.5,    2.4,        3.9,      1,1,1,      0, 0, -1, // Index: 46
        0,      2.4-0.5,    3.9,      1,1,1,      0, 0, -1, // Index: 47

        // Face R2.A.1
        0,      2.4/2,  -2.0,       1, 1, 1,    -0.86824, -0.49614, 0, // Index: 48
        0.7,    0.4,    -2.0,       1, 1, 1,    -0.86824, -0.49614, 0, // Index: 49
        0.7,    0.4,    0,          1, 1, 1,    -0.86824, -0.49614, 0, // Index: 50
        0,      2.4/2,  0,          1, 1, 1,    -0.86824, -0.49614, 0, // Index: 51

        // Face R2.A.2
        4-0.7,  0.4,    -2.0,   1, 1, 1,    0.86824, -0.49614, 0, // Index: 52
        4,      2.4/2,  -2.0,   1, 1, 1,    0.86824, -0.49614, 0, // Index: 53
        4,      2.4/2,  0,      1, 1, 1,    0.86824, -0.49614, 0, // Index: 54
        4-0.7,  0.4,    0,      1, 1, 1,    0.86824, -0.49614, 0, // Index: 55

        // Face R2.A.3
        4-0.7,  2.4-0.4,    -2.0,   1, 1, 1,    0.86824, 0.49614, 0, // Index: 56
        4,      2.4/2,      -2.0,   1, 1, 1,    0.86824, 0.49614, 0, // Index: 57
        4,      2.4/2,      0.0,    1, 1, 1,    0.86824, 0.49614, 0, // Index: 58
        4-0.7,  2.4-0.4,    0.0,    1, 1, 1,    0.86824, 0.49614, 0, // Index: 59
    
        // Face R2.A.4
        0.0,    2.4/2,      -2.0,   1, 1, 1,    -0.86824, 0.49614, 0, // Index: 60
        0.7,    2.4-0.4,    -2.0,   1, 1, 1,    -0.86824, 0.49614, 0, // Index: 61
        0.7,    2.4-0.4,    0.0,    1, 1, 1,    -0.86824, 0.49614, 0, // Index: 62
        0.0,    2.4/2,      0.0,    1, 1, 1,    -0.86824, 0.49614, 0, // Index: 63
    
        // Face R2.B.1
        0.7,    0.4,        -2.0,   1, 1, 1,    0.0,    -1.0,    0.0,   // Index: 64
        4-0.7,  0.4,        -2.0,   1, 1, 1,    0.0,    -1.0,    0.0,   // Index: 65
        4-0.7,  0.4,        0.0,   1, 1, 1,    0.0,    -1.0,    0.0,    // Index: 66
        0.7,    0.4,        0.0,   1, 1, 1,    0.0,    -1.0,    0.0,    // Index: 67
        
        // Face R2.B.2
        0.7,    2.4-0.4,        -2.0,   1, 1, 1,    0.0,    -1.0,    0.0,   // Index: 68
        4-0.7,  2.4-0.4,        -2.0,   1, 1, 1,    0.0,    -1.0,    0.0,   // Index: 69
        4-0.7,  2.4-0.4,        0.0,   1, 1, 1,    0.0,    -1.0,    0.0,    // Index: 70
        0.7,    2.4-0.4,        0.0,   1, 1, 1,    0.0,    -1.0,    0.0,    // Index: 71
    
        // Face R2.C.1
        0.7,    0.4,        -2.0,   1, 1, 1,    0.0, 0.0, 1.0, // Index: 72
        4-0.7,  0.4,        -2.0,   1, 1, 1,    0.0, 0.0, 1.0, // Index: 73
        4,      2.4/2,      -2.0,   1, 1, 1,    0.0, 0.0, 1.0, // Index: 74
        4-0.7,  2.4-0.4,    -2.0,   1, 1, 1,    0.0, 0.0, 1.0, // Index: 75
        0.7,    2.4-0.4,    -2.0,   1, 1, 1,    0.0, 0.0, 1.0, // Index: 76
        0,      2.4/2,      -2.0,   1, 1, 1,    0.0, 0.0, 1.0, // Index: 77

        // Face R3.A.1
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0,       1, 1, 1,        -hex_d, -hex_d, 0.0,    // A Index: 78
        hex_a1,         hex_b1-hex_r,       -2.0,       1, 1, 1,        -hex_d, -hex_d, 0.0,    // B Index: 79
        hex_a1,         hex_b1-hex_r,       -2.0-1.1,   1, 1, 1,        -hex_d, -hex_d, 0.0,    // B Index: 80
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -hex_d, -hex_d, 0.0,    // A Index: 81

        // Face R3.A.2
        hex_a1,         hex_b1-hex_r,       -2.0,       1, 1, 1,        hex_d, -hex_d, 0.0,    // B Index: 82
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0,       1, 1, 1,        hex_d, -hex_d, 0.0,    // C Index: 83
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        hex_d, -hex_d, 0.0,    // C Index: 84
        hex_a1,         hex_b1-hex_r,       -2.0-1.1,   1, 1, 1,        hex_d, -hex_d, 0.0,    // B Index: 85
    
        // Face R3.A.3
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0,       1, 1, 1,        1.0, 0.0, 0.0,    // C Index: 86
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0,       1, 1, 1,        1.0, 0.0, 0.0,    // D Index: 87
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        1.0, 0.0, 0.0,    // D Index: 88
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        1.0, 0.0, 0.0,    // C Index: 89
    
        // Face R3.A.4
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0,       1, 1, 1,        hex_d, hex_d, 0.0,   // D Index: 90
        hex_a1,         hex_b1+hex_r,       -2.0,       1, 1, 1,        hex_d, hex_d, 0.0,   // E Index: 91
        hex_a1,         hex_b1+hex_r,       -2.0-1.1,   1, 1, 1,        hex_d, hex_d, 0.0,   // E Index: 92
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        hex_d, hex_d, 0.0,   // D Index: 93
        
        // Face R3.A.5
        hex_a1,         hex_b1+hex_r,       -2.0,       1, 1, 1,        -hex_d, hex_d, 0.0,   // E Index: 94
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0,       1, 1, 1,        -hex_d, hex_d, 0.0,   // F Index: 95
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -hex_d, hex_d, 0.0,   // F Index: 96
        hex_a1,         hex_b1+hex_r,       -2.0-1.1,   1, 1, 1,        -hex_d, hex_d, 0.0,   // E Index: 97

        // Face R3.A.6
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0,       1, 1, 1,        -1.0, 0.0, 0.0, // F Index: 98
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0,       1, 1, 1,        -1.0, 0.0, 0.0, // A Index: 99
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -1.0, 0.0, 0.0, // A Index: 100
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -1.0, 0.0, 0.0, // F Index: 101

        // Face R4.A.1
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0,       1, 1, 1,        -hex_d, -hex_d, 0.0,    // A Index: 102
        hex_a2,         hex_b2-hex_r,       -2.0,       1, 1, 1,        -hex_d, -hex_d, 0.0,    // B Index: 103
        hex_a2,         hex_b2-hex_r,       -2.0-1.1,   1, 1, 1,        -hex_d, -hex_d, 0.0,    // B Index: 104
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -hex_d, -hex_d, 0.0,    // A Index: 105

        // Face R4.A.2
        hex_a2,         hex_b2-hex_r,       -2.0,       1, 1, 1,        hex_d, -hex_d, 0.0,    // B Index: 106
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0,       1, 1, 1,        hex_d, -hex_d, 0.0,    // C Index: 107
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        hex_d, -hex_d, 0.0,    // C Index: 108
        hex_a2,         hex_b2-hex_r,       -2.0-1.1,   1, 1, 1,        hex_d, -hex_d, 0.0,    // B Index: 109
    
        // Face R4.A.3
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0,       1, 1, 1,        1.0, 0.0, 0.0,    // C Index: 110
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0,       1, 1, 1,        1.0, 0.0, 0.0,    // D Index: 111
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        1.0, 0.0, 0.0,    // D Index: 112
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        1.0, 0.0, 0.0,    // C Index: 113
    
        // Face R4.A.4
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0,       1, 1, 1,        hex_d, hex_d, 0.0,   // D Index: 114
        hex_a2,         hex_b2+hex_r,       -2.0,       1, 1, 1,        hex_d, hex_d, 0.0,   // E Index: 115
        hex_a2,         hex_b2+hex_r,       -2.0-1.1,   1, 1, 1,        hex_d, hex_d, 0.0,   // E Index: 116
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        hex_d, hex_d, 0.0,   // D Index: 117
        
        // Face R4.A.5
        hex_a2,         hex_b2+hex_r,       -2.0,       1, 1, 1,        -hex_d, hex_d, 0.0,   // E Index: 118
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0,       1, 1, 1,        -hex_d, hex_d, 0.0,   // F Index: 119
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -hex_d, hex_d, 0.0,   // F Index: 120
        hex_a2,         hex_b2+hex_r,       -2.0-1.1,   1, 1, 1,        -hex_d, hex_d, 0.0,   // E Index: 121

        // Face R4.A.6
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0,       1, 1, 1,        -1.0, 0.0, 0.0, // F Index: 122
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0,       1, 1, 1,        -1.0, 0.0, 0.0, // A Index: 123
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -1.0, 0.0, 0.0, // A Index: 124
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,   1, 1, 1,        -1.0, 0.0, 0.0, // F Index: 125
        
        // Face R5.A.1
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // A Index: 126
        hex_a1,         hex_b1-hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // B Index: 127
        hex_a1,         hex_b1-hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // B Index: 128
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // A Index: 129

        // Face R5.A.2
        hex_a1,         hex_b1-hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // B Index: 130
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // C Index: 131
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // C Index: 132
        hex_a1,         hex_b1-hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // B Index: 133
    
        // Face R5.A.3
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // C Index: 134
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // D Index: 135
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // D Index: 136
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // C Index: 137
    
        // Face R5.A.4
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // D Index: 138
        hex_a1,         hex_b1+hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // E Index: 139
        hex_a1,         hex_b1+hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // E Index: 140
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // D Index: 141
        
        // Face R5.A.5
        hex_a1,         hex_b1+hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // E Index: 142
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // F Index: 143
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // F Index: 144
        hex_a1,         hex_b1+hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // E Index: 145

        // Face R5.A.6
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // F Index: 146
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // A Index: 147
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // A Index: 148
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // F Index: 149

        // Face R6.A.1
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // A Index: 150
        hex_a2,         hex_b2-hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // B Index: 151
        hex_a2,         hex_b2-hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // B Index: 152
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, -hex_d, 0.0,    // A Index: 153

        // Face R6.A.2
        hex_a2,         hex_b2-hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // B Index: 154
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // C Index: 155
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // C Index: 156
        hex_a2,         hex_b2-hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, -hex_d, 0.0,    // B Index: 157
    
        // Face R6.A.3
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // C Index: 158
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // D Index: 159
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // D Index: 160
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        1.0, 0.0, 0.0,    // C Index: 161
    
        // Face R6.A.4
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // D Index: 162
        hex_a2,         hex_b2+hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // E Index: 163
        hex_a2,         hex_b2+hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // E Index: 164
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        hex_d, hex_d, 0.0,   // D Index: 165
        
        // Face R6.A.5
        hex_a2,         hex_b2+hex_r,       -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // E Index: 166
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // F Index: 167
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // F Index: 168
        hex_a2,         hex_b2+hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -hex_d, hex_d, 0.0,   // E Index: 169

        // Face R6.A.6
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // F Index: 170
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1,       128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // A Index: 171
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // A Index: 172
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        -1.0, 0.0, 0.0, // F Index: 173

        // Face R7.A.1
        hex_a1-hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // A Index: 174
        hex_a1,         hex_b1-hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // B Index: 175
        hex_a1+hex_d,   hex_b1-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // C Index: 176
        hex_a1+hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // D Index: 177
        hex_a1,         hex_b1+hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // E Index: 178
        hex_a1-hex_d,   hex_b1+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // F Index: 179

        // Face R7.A.2
        hex_a2-hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // A Index: 180
        hex_a2,         hex_b2-hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // B Index: 181
        hex_a2+hex_d,   hex_b2-(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // C Index: 182
        hex_a2+hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // D Index: 183
        hex_a2,         hex_b2+hex_r,       -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // E Index: 184
        hex_a2-hex_d,   hex_b2+(1/2)*hex_r, -2.0-1.1-0.8,   128/255, 128/255, 128/255,        0.0, 0.0, -1.0, // F Index: 185

    ];

    // Scale
    for (let i = 0; i < vertices.length / 9; i++) {
        vertices[9*i] /= 4;
        vertices[9*i+1] /= 4;
        vertices[9*i+2] /= 4;
    }

    var indices = [
        // Shape R1
        0, 1, 2,        0, 2, 3,    // Face A.1
        4, 5, 6,        4, 6, 7,    // Face A.2
        8, 9, 10,       8, 10, 11,  // Face A.3
        12, 13, 14,     12, 14, 15, // Face A.4
        16,17,18,       16,18,19,   // Face B.1
        20,21,22,       20,22,23,   // Face B.2
        24, 25, 26,     24, 26, 27, // Face B.3
        28, 29, 30,     28, 30, 31, // Face B.4
        32, 33, 34,     32, 34, 35,     32, 35, 36,     32, 36, 37,     32,37,38,       32,38,39,   // Face C.1
        40, 41, 42,     40, 42, 43,     40, 43, 44,     40, 44, 45,     40, 45, 46,     40, 46, 47, // Face C.2
        // Shape R2
        48, 49, 50,     48, 50, 51, // Face A.1
        52, 53, 54,     52, 54, 55, // Face A.2
        56, 57, 58,     56, 58, 59, // Face A.3
        60, 61, 62,     60, 62, 63, // Face A.4
        64, 65, 66,     64, 66, 67, // Face B.1
        68, 69, 70,     68, 70, 71, // Face B.2
        72, 73, 74,     72, 74, 75,     72, 75, 76,     72, 76, 77, // Face C.1
        // Shape R3
        78, 79, 80,     78, 80, 81, // Face A.1
        82, 83, 84,     82, 84, 85, // Face A.2
        86, 87, 88,     86, 88, 89, // Face A.3
        90, 91, 92,     90, 92, 93, // Face A.4
        94, 95, 96,     94, 96, 97, // Face A.5
        98, 99, 100,    98, 100, 101,   // Face A.6
        // Shape R4
        102, 103, 104,  102, 104, 105, // Face A.1
        106, 107, 108,  106, 108, 109, // Face A.2
        110, 111, 112,  110, 112, 113, // Face A.3
        114, 115, 116,  114, 116, 117, // Face A.4
        118, 119, 120,  118, 120, 121, // Face A.5
        122, 123, 124,  122, 124, 125, // Face A.6
        // Shape R5
        126, 127, 128,  126, 128, 129, // Face A.1
        130, 131, 132,  130, 132, 133, // Face A.2
        134, 135, 136,  134, 136, 137, // Face A.3
        138, 139, 140,  138, 140, 141, // Face A.4
        142, 143, 144,  142, 144, 145, // Face A.5
        146, 147, 148,  146, 148, 149, // Face A.6
        // Shape R6
        150, 151, 152,  150, 152, 153, // Face A.1
        154, 155, 156,  154, 156, 157, // Face A.2
        158, 159, 160,  158, 160, 161, // Face A.3
        162, 163, 164,  162, 164, 165, // Face A.4
        166, 167, 168,  166, 168, 169, // Face A.5
        170, 171, 172,  170, 172, 173, // Face A.6
        // Shape R7
        174, 175, 176,  174, 176, 177,  174, 177, 178,  174, 178, 179, // Face A.1
        180, 181, 182,  180, 182, 183,  180, 183, 184,  180, 184, 185, // Face A.2
    ];


    // Create a linked-list for storing the vertices data
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a linked-list for storing the indices data
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute vec3 aNormal;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;
        uniform mat4 uModel;
        uniform mat4 uView;
        uniform mat4 uProjection;
        void main() {
            vec4 originalPosition = vec4(aPosition, 1.);
            gl_Position = uProjection * uView * uModel * originalPosition;
            vPosition = (uModel * originalPosition).xyz;
            vColor = aColor;
            vNormal = aNormal;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;
        uniform vec3 uAmbientConstant;   // Represents the light color
        uniform float uAmbientIntensity;
        uniform vec3 uDiffuseConstant;  // Represents the light color
        uniform vec3 uLightPosition;
        uniform mat3 uNormalModel;
        uniform vec3 uSpecularConstant; // Represents the light color
        uniform vec3 uViewerPosition;
        void main() {
            
            // Calculate the ambient component
            vec3 ambient = uAmbientConstant * uAmbientIntensity;
            
            // Prepare the diffuse components
            vec3 normalizedNormal = normalize(uNormalModel * vNormal);
            vec3 vLight = uLightPosition - vPosition;
            vec3 normalizedLight = normalize(vLight);
            vec3 diffuse = vec3(0., 0., 0.);
            float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

            // Prepare the specular components
            vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
            // or using the following expression
            // vec3 vReflector = reflect(-vLight, vNormal);
            vec3 vViewer = uViewerPosition - vPosition;
            vec3 normalizedViewer = normalize(vViewer);
            vec3 normalizedReflector = normalize(vReflector);
            float shininessConstant = 100.0;
            vec3 specular = vec3(0., 0., 0.);
            float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
            
            // Calculate the phong reflection effect
            if (cosTheta > 0.) {
                diffuse = uDiffuseConstant * cosTheta;
            }
            if (cosPhi > 0.) {
                specular = uSpecularConstant * pow(cosPhi, shininessConstant);
            }
            vec3 phong = ambient + diffuse + specular;

            // Apply the shading
            gl_FragColor = vec4(phong * vColor, 1.);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);
    var aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.vertexAttribPointer(
        aNormal,
        3,
        gl.FLOAT,
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT,
        6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aNormal);

    // Lighting and Shading
    // AMBIENT
    var uAmbientConstant = gl.getUniformLocation(shaderProgram, "uAmbientConstant");
    var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
    // gl.uniform3fv(uAmbientConstant, [1.0, 0.5, 0.0]);    // orange light
    gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);       // white light
    gl.uniform1f(uAmbientIntensity, 0.263); // 0.200 + 0.063
    // DIFFUSE
    var uDiffuseConstant = gl.getUniformLocation(shaderProgram, "uDiffuseConstant");
    var uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    var uNormalModel = gl.getUniformLocation(shaderProgram, "uNormalModel");
    gl.uniform3fv(uDiffuseConstant, [1.0, 1.0, 1.0]);   // white light
    gl.uniform3fv(uLightPosition, [-2.0, 0.0, -5.0]);    // light position

    // Perspective projection
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    var perspectiveMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(perspectiveMatrix, Math.PI/3, 1.0, 0.5, 10.0);
    gl.uniformMatrix4fv(uProjection, false, perspectiveMatrix);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    var cameraX = 0.3;
    var cameraY = 0.5;
    var cameraZ = 3.1;
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
        viewMatrix,
        [cameraX, cameraY, cameraZ],    // the location of the eye or the camera
        [cameraX, 0.0, -10],        // the point where the camera look at
        [0.0, 1.0, 0.0]
    );
    gl.uniformMatrix4fv(uView, false, viewMatrix);
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
        if (event.keyCode == 37) cameraX -= 0.1; // Left
        if (event.keyCode == 38) cameraZ -= 0.1; // Up
        if (event.keyCode == 39) cameraX += 0.1; // Right
        if (event.keyCode == 40) cameraZ += 0.1; // Down
        if (event.keyCode == 90) cameraY += 0.1; // Z
        if (event.keyCode == 88) cameraY -= 0.1; // Down
        glMatrix.mat4.lookAt(
            viewMatrix,
            [cameraX, cameraY, cameraZ],    // the location of the eye or the camera
            [cameraX, 0.0, -10],        // the point where the camera look at
            [0.0, 1.0, 0.0]
        );
        gl.uniformMatrix4fv(uView, false, viewMatrix);
        document.getElementById("cameraX").innerHTML = cameraX;
        document.getElementById("cameraY").innerHTML = cameraY;
        document.getElementById("cameraZ").innerHTML = cameraZ;
    }
    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);
    
    // SPECULAR
    var uSpecularConstant = gl.getUniformLocation(shaderProgram, "uSpecularConstant");
    var uViewerPosition = gl.getUniformLocation(shaderProgram, "uViewerPosition");
    gl.uniform3fv(uSpecularConstant, [1.0, 1.0, 1.0]);  // white light
    gl.uniform3fv(uViewerPosition, [cameraX, cameraY, cameraZ]);

    var speedRaw = 2;
    // var speedX = speedRaw / 600;
    var speedX = 0;
    var speedY = 2 * speedRaw / 600;
    var changeX = 0;
    var changeY = 0;
    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    function render() {
        if (!freeze) {  // If it is not freezing, then animate the rectangle
            if (changeX >= 2.5 || changeX <= -1.5) speedX = -speedX;
            if (changeY >= 2.5 || changeY <= -1.5) speedY = -speedY;
            changeX = changeX + speedX;
            changeY = changeY + speedY;
            var modelMatrix = glMatrix.mat4.create();
            // glMatrix.mat4.scale(modelMatrix, modelMatrix, [changeY, changeY, changeY]);
            glMatrix.mat4.translate(modelMatrix, modelMatrix, [-3.0, 0.0, -5.0]);
            glMatrix.mat4.rotate(modelMatrix, modelMatrix, changeX, [0.0, 0.0, 1.0]);   // Rotation about Z axis
            glMatrix.mat4.rotate(modelMatrix, modelMatrix, changeY * 2.0, [0.0, 1.0, 0.0]);   // Rotation about Y axis
            gl.uniformMatrix4fv(uModel, false, modelMatrix);
            var normalModelMatrix = glMatrix.mat3.create();
            glMatrix.mat3.normalFromMat4(normalModelMatrix, modelMatrix);
            gl.uniformMatrix3fv(uNormalModel, false, normalModelMatrix);
        }
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var primitive = gl.TRIANGLES;

        var offset, nVertex;
        offset = 0;
        nVertex = indices.length;
        // gl.drawArrays(primitive, offset, nVertex);
        gl.drawElements(primitive, nVertex, gl.UNSIGNED_SHORT, offset);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}