export function generate(params: any): string {
	return `QT += core gui widgets network

greaterThan(QT_MAJOR_VERSION, 5): QT += core5compat

CONFIG += c++17
TARGET = MyApp
TEMPLATE = app

SOURCES += \\
    main.cpp \\
    mainwindow.cpp

HEADERS += \\
    mainwindow.h

FORMS += \\
    mainwindow.ui

RESOURCES += \\
    resources.qrc

INCLUDEPATH += src/

LIBS += -L/usr/local/lib

win32:CONFIG(release, debug|release): LIBS += -L$$PWD/../../lib/
else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../lib/
else:unix: LIBS += -L$$PWD/../../lib/ -lmylib`;
}
