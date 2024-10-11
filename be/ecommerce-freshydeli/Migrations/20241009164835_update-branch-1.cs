using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updatebranch1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                schema: "dbo",
                table: "Branch",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                schema: "dbo",
                table: "Branch",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isClient",
                schema: "dbo",
                table: "Branch",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Branch_ClientId",
                schema: "dbo",
                table: "Branch",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Branch_Client_ClientId",
                schema: "dbo",
                table: "Branch",
                column: "ClientId",
                principalSchema: "oss-ecommerce",
                principalTable: "Client",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branch_Client_ClientId",
                schema: "dbo",
                table: "Branch");

            migrationBuilder.DropIndex(
                name: "IX_Branch_ClientId",
                schema: "dbo",
                table: "Branch");

            migrationBuilder.DropColumn(
                name: "Active",
                schema: "dbo",
                table: "Branch");

            migrationBuilder.DropColumn(
                name: "ClientId",
                schema: "dbo",
                table: "Branch");

            migrationBuilder.DropColumn(
                name: "isClient",
                schema: "dbo",
                table: "Branch");
        }
    }
}
