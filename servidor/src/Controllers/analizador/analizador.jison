%{
//CODIGO JS
const ListaErrores= require('../indexController').listaErrores;
const errores= require('./Excepciones/Errores');
const Tipo=require('./simbolo/Tipo')
//expresiones
const Nativo=require('./expresiones/Nativo')
const Aritmeticas=require('./expresiones/Aritmeticas')
const Relacionales=require('./expresiones/Relacionales')
const Logicas=require('./expresiones/Logicas')
//instrucciones
const Print=require('./instrucciones/Print')
const PrintLn=require('./instrucciones/Println')
const DeclaracionVar=require('./instrucciones/DeclaracionVar')
const AccesoVar=require('./instrucciones/AccesoVar')
const DeclaracionArray=require('./instrucciones/DeclaracionArray')
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


//cometarios
(\/\/.*[^\n])     {}
(\/\*([^*/]|[^*]\/|\*[^/])*\*\/)    {}


"=="                return 'EQUALS';
"!="                return 'NOTEQUAL';
"<="                return 'MENOREQ';
">="                return 'MAYOREQ';
"||"                return 'OR';
"&&"                return 'AND';
"++"                return 'INCREMENT';
"--"                return 'DECREMENT';
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
//simbolos
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'MULT';


//adicionales
[a-z][a-z0-9_]*     return 'ID';
[0-9]+"."[0-9]+     return 'DECIMAL';
[0-9]+              return 'ENTERO';
[\']([^\t\'\"\n]|(\\\")|(\\n)|(\\\')|(\\t)|(\\\\))?[\']         {yytext=yytext.substr(1,yyleng-2); return 'CARACTER';}
[\"]((\\\")|[^\"\n])*[\"]       {yytext=yytext.substr(1,yyleng-2); return 'CADENA';}




//espacios en blanco
[\ \r\t\f\t]        {};
[\ \n]              {};

<<EOF>>             return 'EOF';
.                   {ListaErrores.push(new errores.default("Lexico","El caracter "+ yytext+" no pertenece al lenguaje",this._$.first_line,this._$.first_column));}

%{

%}
/lex
//Precedencia
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'EQUALS' 'NOTEQUAL' 'MENOR' 'MENOREQ' 'MAYOR' 'MAYOREQ'
%left 'MAS' 'MENOS'
%left 'MULT' 'DIV'
%nonassoc 'POW'
%right 'UMENOS'

//Simbolo Inicial
%start INICIO
%%

INICIO : INSTRUCCIONES EOF      {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$1.push($2);$$=$1;}
                | INSTRUCCION {$$=[$1];}
                | error PUNTOCOMA {ListaErrores.push(new errores.default("Sintactico",yytext,@1.first_line,@1.first_column));}
;

INSTRUCCION : DECLARACION   {$$=$1;}
            | CAST
            | VEC           {$$=$1;}
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
            | PRINTT        {$$=$1;}
            | PRINTLNN      {$$=$1;}
            | RUNN            
;

//Expresiones
EXP : EXP MAS EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}   
    | EXP MENOS EXP                         {$$=new Aritmeticas.default(Aritmeticas.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}   
    | EXP MULT EXP                          {$$=new Aritmeticas.default(Aritmeticas.Operadores.MULT,@1.first_line,@1.first_column,$1,$3);}
    | EXP DIV EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.DIV,@1.first_line,@1.first_column,$1,$3);}
    | EXP POW EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.POW,@1.first_line,@1.first_column,$1,$3);}
    | EXP MOD EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.MOD,@1.first_line,@1.first_column,$1,$3);}
    | MENOS EXP %prec UMENOS                {$$=new Aritmeticas.default(Aritmeticas.Operadores.NEG,@1.first_line,@1.first_column,$2);}
    | EXP EQUALS EXP                        {$$=new Relacionales.default(Relacionales.Relacional.EQUALS,@1.first_line,@1.first_column,$1,$3);}
    | EXP NOTEQUAL EXP                      {$$=new Relacionales.default(Relacionales.Relacional.NOTEQUAL,@1.first_line,@1.first_column,$1,$3);}
    | EXP MENOR EXP                         {$$=new Relacionales.default(Relacionales.Relacional.MENOR,@1.first_line,@1.first_column,$1,$3);}
    | EXP MENOREQ EXP                       {$$=new Relacionales.default(Relacionales.Relacional.MENOREQ,@1.first_line,@1.first_column,$1,$3);}
    | EXP MAYOR EXP                         {$$=new Relacionales.default(Relacionales.Relacional.MAYOR,@1.first_line,@1.first_column,$1,$3);}
    | EXP MAYOREQ EXP                       {$$=new Relacionales.default(Relacionales.Relacional.MAYOREQ,@1.first_line,@1.first_column,$1,$3);}
    | EXP OR EXP                            {$$=new Logicas.default(Logicas.Logica.OR,@1.first_line,@1.first_column,$1,$3);}
    | EXP AND EXP                           {$$=new Logicas.default(Logicas.Logica.AND,@1.first_line,@1.first_column,$1,$3);}
    | NOT EXP                               {$$=new Logicas.default(Logicas.Logica.NOT,@1.first_line,@1.first_column,$2);}
    | PAR1 EXP PAR2                         {$$=$2;}
    | EXP INCREMENT
    | EXP DECREMENT
    | ID COR1 EXP COR2 
    | ID COR1 EXP COR2 COR1 EXP COR2
    | LLAMADA
    | TOLOW
    | TOUP
    | ROUNDD
    | LENGTHH
    | TYPEOFF
    | TOSTRINGG
    | ENTERO                                {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    | DECIMAL                               {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
    | TRUE                                  {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL),$1,@1.first_line,@1.first_column);}
    | FALSE                                 {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL),$1,@1.first_line,@1.first_column);}
    | CARACTER                              {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1,@1.first_line,@1.first_column);}
    | CADENA                                {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
    | ID                                    {$$=new AccesoVar.default($1,@1.first_line,@1.first_column);}
;

//tipos de datos
TIPOS: INT          {$$=new Tipo.default(Tipo.tipoDato.ENTERO);}
    | DOUBLE        {$$=new Tipo.default(Tipo.tipoDato.DECIMAL);}
    | BOOL          {$$=new Tipo.default(Tipo.tipoDato.BOOL);}
    | CHAR          {$$=new Tipo.default(Tipo.tipoDato.CARACTER);}
    | STRING        {$$=new Tipo.default(Tipo.tipoDato.CADENA);}
;

//declaracion de variables simples
DECLARACION : TIPOS LISTD DEC2      {$$=new DeclaracionVar.default($1,@1.first_line,@1.first_column,$2,$3);}
;

LISTD : LISTD COMA ID       {$1.push($3);$$=$1;}
    | ID                    {$$=[$1];}
;

DEC2 : PUNTOCOMA                {$$=null;}
    |   IGUAL EXP PUNTOCOMA     {$$=$2;}
;

//asignacion
ASI : ID IGUAL EXP PUNTOCOMA

;

//declaracion de vectores
/*
VEC:  DOS DIMENSIONES VACIO
    | DOS DIMENSIONES INICIALIZADO
    | UNA DIMENSION VACIO
    | UNA DIMENSION INICIALIZADO
    | ARRAYCHAR (UNA DIMENSION)
*/  
                                                  //                                            $$=new DeclaracionArray.default(tipo, id, linea, col, dimension, valor, size1, size2);}                                         
VEC : TIPOS ID COR1 COR2 COR1 COR2 IGUAL NEW TIPOS COR1 EXP COR2 COR1 EXP COR2 PUNTOCOMA        {$$=new DeclaracionArray.default($1,$2,@1.first_line,@1.first_column,2,null,$11,$14);}
    | TIPOS ID COR1 COR2 COR1 COR2 IGUAL COR1 LISTVEC2 COR2 PUNTOCOMA                           {$$=new DeclaracionArray.default($1,$2,@1.first_line,@1.first_column,2,$9,0,0);}
    | TIPOS ID COR1 COR2 IGUAL NEW TIPOS COR1 EXP COR2 PUNTOCOMA                                {$$=new DeclaracionArray.default($1,$2,@1.first_line,@1.first_column,1,null,$9,0);}
    | TIPOS ID COR1 COR2 IGUAL COR1 LISTVEC COR2 PUNTOCOMA                                      {$$=new DeclaracionArray.default($1,$2,@1.first_line,@1.first_column,1,$7,0,0);}
    | TIPOS ID COR1 COR2 IGUAL TOCHARARRAYY                                                     {$$=new DeclaracionArray.default($1,$2,@1.first_line,@1.first_column,1,$6,0,0);}
;


LISTVEC : LISTVEC COMA EXP      {$1.push($3);$$=$1;}
        | EXP                   {$$=[$1];}
;

LISTVEC2 : LISTVEC2 COMA COR1 LISTVEC COR2      {$1.push($4); $$=$1;}
        | COR1 LISTVEC COR2                     {$$=[$2];}
;

//modifica vectores
MVEC : ID COR1 EXP COR2 MVEC2 EXP PUNTOCOMA
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
CWHILE : WHILE PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2
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
        | RETURN EXP PUNTOCOMA
;

// Funciones
FUNCS : ID PAR1 PARAMS PAR2 DOSPUNTOS TIPOS LLAVE1 INSTRUCCIONES LLAVE2
    |   ID PAR1  PAR2 DOSPUNTOS TIPOS LLAVE1 INSTRUCCIONES LLAVE2
;

PARAMS : PARAMS COMA TIPOS ID
        | TIPOS ID
;

//Metodos
METODS : ID PAR1 PARAMS PAR2 DOSPUNTOS VOID LLAVE1 INSTRUCCIONES LLAVE2
    |   ID PAR1 PAR2 DOSPUNTOS VOID LLAVE1 INSTRUCCIONES LLAVE2
;

// llamadas
LLAMADA : ID PAR1 PARAMSCALL PAR2 PUNTOCOMA
        | ID PAR1 PAR2 PUNTOCOMA
;

PARAMSCALL : PARAMSCALL COMA EXP
            | EXP
;

// print
PRINTT : PRINT PAR1 EXP PAR2 PUNTOCOMA {$$=new Print.default($3,@1.first_line,@1.first_column);}
;

// println
PRINTLNN : PRINTLN PAR1 EXP PAR2 PUNTOCOMA {$$=new PrintLn.default($3,@1.first_line,@1.first_column);}
;

// tolower
TOLOW : TOLOWER PAR1 EXP PAR2 
;

// toupper
TOUP : TOUPPER PAR1 EXP PAR2 
;

 // round
ROUNDD : ROUND PAR1 DECIMAL PAR2 
;

// length
LENGTHH : LENGTH PAR1 VALENG PAR2 
;

VALENG : ID 
        | ID COR1 EXP COR2
        | CADENA
;

//typeof
TYPEOFF : TYPEOF PAR1 EXP PAR2 
;

// tostring
TOSTRINGG : TOSTRING PAR1 EXP PAR2 
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