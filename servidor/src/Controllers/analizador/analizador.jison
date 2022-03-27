%{
//CODIGO JS
%}

%lex
%options case-insensitive 
%%
//palabras reservadas
"int"               return 'INT';
"double"            return 'DOUBLE';
"boolean"           return 'BOOL';
"char"              return 'CHAR';
"string"            return 'STRING';
"new"               return 'NEW';
"if"                return 'IF';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"break"             return 'BREAK';
"default"           return 'DEFAULT';
"while"             return 'WHILE';
"for"               return 'FOR';
"do"                return 'DO';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"print"             return 'PRINT'
"println"           return 'PRINTLN';
"tolower"           return 'TOLOWER';
"toupper"           return 'TOUPPER';
"round"             return 'ROUND';
"length"            return 'LENGTH';
"typeof"            return 'TYPEOF';
"tostring"          return 'TOSTRING';
"tochararray"       return 'TOCHARARRAY';
"run"               return 'RUN';
"null"              return 'NULL';
"true"              return 'TRUE';
"false"             return 'FALSE';
"void"              return 'VOID';

//simbolos
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'MULT';
"/"                 return 'DIV';
"^"                 return 'POW'
"%"                 return 'MOD';
"="                 return 'IGUAL';
"!"                 return 'NOT';
"<"                 return 'MENOR';
">"                 return 'MAYOR';
"?"                 return 'TERNARIO';
"("                 return 'PAR1';
")"                 return 'PAR2';
"{"                 return 'LLAVE1';
"}"                 return 'LLAVE2';
"["                 return 'COR1';
"]"                 return 'COR2';
":"                 return 'DOSPUNTOS';
";"                 return 'PUNTOCOMA';
","                 return 'COMA';
"=="                return 'EQUALS';
"!="                return 'NOTEQUAL';
"<="                return 'MENOREQ';
">="                return 'MAYOREQ';
"||"                return 'OR';
"&&"                return 'AND';
"++"                return 'INCREMENT';
"--"                return 'DECREMENT';

//adicionales
[a-z][a-z0-1_]*     return 'ID';
[0-9]+              return 'ENTERO';
[0-9]+"."[0-9]+     return 'DECIMAL';
[\']([^\t\'\"\n]|(\\\")|(\\n)|(\\\')|(\\t)|(\\\\))?[\']         return 'CARACTER';
[\"]((\\\")|[^\"\n])*[\"]       return 'CADENA';


//cometarios
(\/\/.*[^\n])       {}
\/\*\/*([^*/]|[^*]\/|\*[^/])*\**\*\/    {}

//espacios en blanco
[\ \r\t\f\t]        {}
[\ \n]              {}

<<EOF>>             return 'EOF';
.                   return 'INVALID';

/lex
//Precedencia
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'EQUALS' 'NOTEQUAL' 'MENOR' 'MENOREQ' 'MAYOR' 'MAYOREQ'
%left 'MAS' 'MENOS'
%left 'MULT' 'DIV'
%nonassoc 'POW'
%right 'MENOS'

//Simbolo Inicial
%start INICIO
%%

INICIO : INSTRUCCIONES EOF
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
                | INSTRUCCION
;

INSTRUCCION : DECLARACION
            | CAST
            | VEC
            | MVEC
            | SIF
            | SSWITCH
            | CWHILE
            | CFOR
            | CDOW
            | TBREAK
            | TCONTINUE
            | TRETURN
            | FUNCS
            | METODS
            | LLAMADA
            | PRINTT
            | PRINTLNN
            | INVALID
;

//Expresiones
EXP : EXP MAS EXP
    | EXP MENOS EXP
    | EXP MULT EXP
    | EXP DIV EXP
    | EXP POW EXP
    | EXP MOD EXP
    | MENOS EXP
    | EXP EQUALS EXP
    | EXP NOTEQUAL EXP
    | EXP MENOR EXP
    | EXP MENOREQ EXP
    | EXP MAYOR EXP
    | EXP MAYOREQ EXP
    | EXP OR EXP
    | EXP AND EXP
    | NOT EXP
    | PAR1 EXP PAR2
    | EXP INCREMENT
    | EXP DECREMENT
    | ID
    | ID COR1 EXP COR2 
    | ID COR1 EXP COR2 COR1 EXP COR2
    | LLAMADA
    | TOLOW
    | TOUP
    | ROUNDD
    | LENGTHH
    | TYPEOFF
    | TOSTRINGG
    | TOCHARARRAYY
    | ENTERO
    | DECIMAL
    | TRUE
    | FALSE
    | CARACTER
    | CADENA
;

//tipos de datos
TIPOS: INT
    | DOUBLE
    | BOOL
    | CHAR
    | STRING
;

//declaracion de variables simples
DECLARACION : TIPOS LISTD DEC2
;

LISTD : LISTD COMA ID
    | ID
;

DEC2 : PUNTOCOMA
    |   IGUAL EXP PUNTOCOMA
;

//asignacion
ASI : ID IGUAL EXP PUNTOCOMA

;

//casteo
CAST: PAR1 TIPOS PAR2 EXP
;

//declaracion de vectores
VEC : TIPOS ID COR1 COR2 VEC2 DECV PUNTOCOMA
;

VEC2 : COR1 COR2 IGUAL
    | IGUAL
;

DECV : NEW TIPOS COR1 EXP COR2 DECV2
    | COR1 LISTVEC COR2
;

DECV2 : PUNTOCOMA
    | COR1 EXP COR2 PUNTOCOMA
;

LISTVEC : LISTVEC EXP
        | EXP
;

//modifica vectores
MVEC : ID COR1 EXP COR2 VEC2 MVEC2 EXP PUNTOCOMA
;

MVEC2 : COR1 EXP COR2 IGUAL
    | IGUAL
;


//if
SIF : IF PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2
    | IF PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2 ELSE LLAVE1 INSTRUCCIONES LLAVE2
    | IF PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2 ELSE SIF
;

//switch
SSWITCH : SWITCH PAR1 EXP PAR2 LLAVE1 LISTCASE SDEF LLAVE2
        | SWITCH PAR1 EXP PAR2 LLAVE1 LISTCASE LLAVE2
        | SWITCH PAR1 EXP PAR2 LLAVE1 SDEF LLAVE2
;

LISTCASE : LISTCASE CASE EXP DOSPUNTOS INSTRUCCIONES
        | CASE EXP DOSPUNTOS INSTRUCCIONES
;

SDEF : DEFAULT DOSPUNTOS INSTRUCCIONES
;

//while
CWHILE : WHILE PAR1 EXP COR2 LLAVE1 INSTRUCCIONES LLAVE2
;

//for
CFOR : FOR PAR1 S_DEC_ASI EXP PUNTOCOMA ID ACTUALIZACION PAR2 LLAVE1 INSTRUCCIONES LLAVE2
;

S_DEC_ASI : DECLARACION
        | ASI
;

ACTUALIZACION : INCREMENT
            | DECREMENT
;

//do.while
CDOW : DO LLAVE1 INSTRUCCIONES LLAVE2 WHILE PAR1 EXP PAR2 PUNTOCOMA
; 

// break
TBREAK : BREAK PUNTOCOMA
;

// continue
TCONTINUE : CONTINUE PUNTOCOMA
;

// return
TRETURN : RETURN PUNTOCOMA
        | RETURN EXP
;

// Funciones
FUNCS : ID PAR1 PARAMS PAR2 DOSPUNTOS TIPOS LLAVE1 INSTRUCCIONES LLAVE2
;

PARAMS : PARAMS COMA TIPOS ID
        | TIPOS ID
;

//Metodos
METODS : ID PAR1 PARAMS PAR2 DOSPUNTOS VOID LLAVE1 INSTRUCCIONES LLAVE1
;

// llamadas
LLAMADA : ID PAR1 PARAMSCALL PAR2
        | ID PAR1 PAR2
;

PARAMSCALL : PARAMSCALL COMA ID
            | ID
;

// print
PRINTT : PRINT PAR1 EXP PAR2 PUNTOCOMA
;

// println
PRINTLNN : PRINTLN PAR1 EXP PAR2 PUNTOCOMA
;

// tolower
TOLOW : TOLOWER PAR1 EXP PAR2 PUNTOCOMA
;

// toupper
TOUP : TOUPPER PAR1 EXP PAR2 PUNTOCOMA
;

 // round
ROUNDD : ROUND PAR1 DECIMAL PAR2 PUNTOCOMA
;

// length
LENGTHH : LENGTH PAR1 VALENG PAR2 PUNTOCOMA
;

VALENG : ID 
        | ID COR1 EXP COR2
        | CADENA
;

//typeof
TYPEOFF : TYPEOF PAR1 EXP PAR2 PUNTOCOMA
;

// tostring
TOSTRINGG : TOSTRING PAR1 EXP PAR2 PUNTOCOMA
;

// to char array
TOCHARARRAYY : TOCHARARRAY PAR1 EXP PAR2 PUNTOCOMA
;

// RUN
RUNN : RUN ID PAR1 PAR2 PUNTOCOMA
    | RUN ID PAR1 LISTRUN PAR2 PUNTOCOMA
;

LISTRUN : LISTRUN COMA EXP
        | EXP
;