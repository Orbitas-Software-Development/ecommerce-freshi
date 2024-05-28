using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class clientListBranch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BranchPriceLists",
                schema: "oss-ecommerce");

            migrationBuilder.CreateTable(
                name: "ClientPriceList",
                schema: "oss-ecommerce",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriceListId = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientPriceList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientPriceList_Client_ClientId",
                        column: x => x.ClientId,
                        principalSchema: "oss-ecommerce",
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientPriceList_PriceList_PriceListId",
                        column: x => x.PriceListId,
                        principalSchema: "oss-ecommerce",
                        principalTable: "PriceList",
                        principalColumn: "PriceListId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientPriceList_ClientId",
                schema: "oss-ecommerce",
                table: "ClientPriceList",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPriceList_PriceListId",
                schema: "oss-ecommerce",
                table: "ClientPriceList",
                column: "PriceListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientPriceList",
                schema: "oss-ecommerce");

            migrationBuilder.CreateTable(
                name: "BranchPriceLists",
                schema: "oss-ecommerce",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    PriceListId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchPriceLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BranchPriceLists_Branch_BranchId",
                        column: x => x.BranchId,
                        principalSchema: "oss-ecommerce",
                        principalTable: "Branch",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BranchPriceLists_PriceList_PriceListId",
                        column: x => x.PriceListId,
                        principalSchema: "oss-ecommerce",
                        principalTable: "PriceList",
                        principalColumn: "PriceListId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BranchPriceLists_BranchId",
                schema: "oss-ecommerce",
                table: "BranchPriceLists",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_BranchPriceLists_PriceListId",
                schema: "oss-ecommerce",
                table: "BranchPriceLists",
                column: "PriceListId");
        }
    }
}
