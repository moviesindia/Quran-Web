const pageAyatData = {
    1: [
      { id: "surat1-bismillah", surah: 1, ayat: 0, top: 29, left: 25, width: 47, height: 5, title: "Surah Al-Fatiha, Bismillah" },

      { id: "surat1-ayat1", surah: 1, ayat: 1, top: 35, left: 38, width: 38, height: 5, title: "Surah Al-Fatiha, Ayat 1" },

      { 
        id: "surat1-ayat2", 
        surah: 1, 
        ayat: 2, 
        title: "Surah Al-Fatiha, Ayat 2",
        lines: [
          { id: "surat1-ayat2-line1", top: 35, left: 21, width: 11, height: 5 },
          { id: "surat1-ayat2-line2", top: 40, left: 63, width: 13, height: 6 }
        ]
      },

      { id: "surat1-ayat3", surah: 1, ayat: 3, top: 40, left: 28, width: 29, height: 6, title: "Surah Al-Fatiha, Ayat 3" },

      { id: "surat1-ayat4", surah: 1, ayat: 4, top: 46, left: 27, width: 49, height: 6, title: "Surah Al-Fatiha, Ayat 4" },


      { id: "surat1-ayat5", surah: 1, ayat: 5, top: 52, left: 38, width: 38, height: 6, title: "Surah Al-Fatiha, Ayat 5" },


      { 
        id: "surat1-ayat6", 
        surah: 1, 
        ayat: 6, 
        title: "Surah Al-Fatiha, Ayat 6",
        lines: [
          { id: "surat1-ayat6-line1", top: 51, left: 21, width: 12, height: 6 },
          { id: "surat1-ayat6-line2", top: 57, left: 21, width: 55, height: 6 },
          { id: "surat1-ayat6-line3", top: 63, left: 36, width: 31, height: 6 }
        ]
      },
      // Add more ayat for page 1
    ],
    2: [
      { id: "surat2-bismillah", surah: 1, ayat: 0, top: 29, left: 29, width: 45, height: 6, title: "Surah Al-Baqarah, Bismillah" },


      { id: "page2-ayat1", surah: 2, ayat: 1, top: 36, left: 74, width: 6, height: 5, title: "Surah Al-Baqarah, Ayat 1" },


      { 
        id: "surat2-ayat2", 
        surah: 2, 
        ayat: 2, 
        title: "Surah Al-Baqarah, Ayat 2",
        lines: [
          { id: "surat2-ayat2-line1", top: 35, left: 24, width: 45, height: 6 },
          { id: "surat2-ayat2-line2", top: 41, left: 70, width: 10, height: 6 }
        ]
      },


      { 
        id: "surat2-ayat3", 
        surah: 2, 
        ayat: 3, 
        title: "Surah Al-Baqarah, Ayat 3",
        lines: [
          { id: "surat2-ayat3-line1", top: 41, left: 24, width: 40, height: 6 },
          { id: "surat2-ayat3-line2", top: 47, left: 30, width: 50, height: 6 }
        ]
      },

      { 
        id: "surat2-ayat4", 
        surah: 2, 
        ayat: 4, 
        title: "Surah Al-Baqarah, Ayat 4",
        lines: [
          { id: "surat1-ayat4-line1", top: 53, left: 24, width: 56, height: 5 },
          { id: "surat1-ayat4-line2", top: 58, left: 44, width: 36, height: 6 }
        ]
      },

      { 
        id: "surat2-ayat5", 
        surah: 2, 
        ayat: 5, 
        title: "Surah Al-Baqarah, Ayat 5",
        lines: [
          { id: "surat1-ayat5-line1", top: 58, left: 24, width: 15, height: 6 },
          { id: "surat1-ayat5-line2", top: 64, left: 30, width: 50, height: 5 }
        ]
      },
      // Add more ayat for page 2
    ],
    3: [
      { 
        id: "surat2-ayat6", 
        surah: 2, 
        ayat: 6, 
        title: "Surah Al-Baqarah, Ayat 6",
        lines: [
          { id: "surat1-ayat6-line1", top: 15, left: 3, width: 80, height: 4 },
          { id: "surat1-ayat6-line2", top: 19, left: 68, width: 15, height: 4 }
        ]
      },


      { 
        id: "surat2-ayat7", 
        surah: 2, 
        ayat: 7, 
        title: "Surah Al-Baqarah, Ayat 7",
        lines: [
          { id: "surat1-ayat7-line1", top: 19, left: 4, width: 60, height: 4 },
          { id: "surat1-ayat7-line2", top: 23, left: 24, width: 59, height: 5 }
        ]
      },
      // Add more ayat for page 3
    ],
    4: [
      { id: "page4-ayat1", surah: 2, ayat: 4, top: 10, left: 25, width: 50, height: 5, title: "Surah Al-Baqarah, Ayat 4" },
      { id: "page4-ayat2", surah: 2, ayat: 5, top: 20, left: 20, width: 60, height: 5, title: "Surah Al-Baqarah, Ayat 5" }
      // Add more ayat for page 4
    ],
    5: [
      { id: "page5-ayat1", surah: 2, ayat: 6, top: 15, left: 30, width: 40, height: 5, title: "Surah Al-Baqarah, Ayat 6" },
      { id: "page5-ayat2", surah: 2, ayat: 7, top: 30, left: 25, width: 50, height: 5, title: "Surah Al-Baqarah, Ayat 7" },
      { id: "page5-ayat3", surah: 2, ayat: 8, top: 45, left: 20, width: 60, height: 5, title: "Surah Al-Baqarah, Ayat 8" }
      // Add more ayat for page 5
    ]
  };