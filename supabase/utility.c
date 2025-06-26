// src/supautils.c

// include common declarations
#include "postgres.h"

// required macro for extension libraries to work
PG_MODULE_MAGIC;

// variable for the previous hook
static ProcessUtility_hook_type prev_hook = NULL;

// variable for our reserved roles configuration parameter
static char *reserved_roles = NULL;

// function declaration for extension initialization
void _PG_init(void);

// function declaration for our hook
static void supautils_hook(
    PlannedStmt *pstmt,
    const char *queryString,
    ProcessUtilityContext context,
    ParamListInfo params,
    QueryEnvironment *queryEnv,
    DestReceiver *dest,
    QueryCompletion *completionTag
);

// function declaration for our pure function that will return a reserved role
static char* look_for_reserved_role(Node *utility_stmt, List *reserved_role_list);
